import type { AuthState, AuthUser } from "./auth.types";
import { session } from "./session";

type Listener = () => void;

const listeners = new Set<Listener>();

let state: AuthState = {
  status: "loading",
  user: null,
  accessToken: null,
};

function emit() {
  listeners.forEach((listener) => listener());
}

function setState(partial: Partial<AuthState>) {
  state = { ...state, ...partial };
  emit();
}

/**
 * Lightweight auth store (not Redux).
 * Server cache stays in React Query; only session/auth client state lives here.
 */
export const authStore = {
  getState(): AuthState {
    return state;
  },

  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  async hydrate() {
    setState({ status: "loading" });

    const persisted = await session.hydrate();

    if (persisted?.tokens.accessToken && persisted.user) {
      setState({
        status: "authenticated",
        user: persisted.user,
        accessToken: persisted.tokens.accessToken,
      });
      return;
    }

    setState({
      status: "unauthenticated",
      user: null,
      accessToken: null,
    });
  },

  async setAuthenticated(input: {
    user: AuthUser;
    accessToken: string;
    refreshToken?: string | null;
  }) {
    await session.setSession(input);
    setState({
      status: "authenticated",
      user: input.user,
      accessToken: input.accessToken,
    });
  },

  setUnauthenticated() {
    setState({
      status: "unauthenticated",
      user: null,
      accessToken: null,
    });
  },

  async clearSession() {
    await session.clear();
    this.setUnauthenticated();
  },
};
