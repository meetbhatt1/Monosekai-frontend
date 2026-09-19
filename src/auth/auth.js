import AsyncStorage from "@react-native-async-storage/async-storage";

// --- types ---






















// --- persistence + in-memory token access (used by axios interceptor) ---

const KEYS = {
  accessToken: "monosekai.auth.accessToken",
  refreshToken: "monosekai.auth.refreshToken",
  user: "monosekai.auth.user",
  onboarding: "monosekai.onboarding.completed",
  profile: "monosekai.profile.selected"
};

let memoryToken = null;
let memoryUser = null;
let apiBaseUrl = "";

export const session = {
  setApiBaseUrl(url) {
    apiBaseUrl = url ?? "";
  },

  getApiBaseUrl() {
    return apiBaseUrl;
  },

  getAccessToken() {
    return memoryToken;
  },

  async hydrate() {
    const [accessToken, userRaw] = await Promise.all([
    AsyncStorage.getItem(KEYS.accessToken),
    AsyncStorage.getItem(KEYS.user)]
    );

    memoryToken = accessToken;

    if (!accessToken || !userRaw) {
      memoryUser = null;
      return null;
    }

    try {
      memoryUser = JSON.parse(userRaw);
    } catch {
      memoryUser = null;
      await session.clear();
      return null;
    }

    return { user: memoryUser, accessToken };
  },

  async save(input)



  {
    memoryUser = input.user;
    memoryToken = input.accessToken;

    await Promise.all([
    AsyncStorage.setItem(KEYS.accessToken, input.accessToken),
    AsyncStorage.setItem(KEYS.user, JSON.stringify(input.user)),
    input.selectedProfileId ?
    AsyncStorage.setItem(KEYS.profile, input.selectedProfileId) :
    AsyncStorage.removeItem(KEYS.profile)]
    );
  },

  async updateToken(accessToken) {
    memoryToken = accessToken;
    await AsyncStorage.setItem(KEYS.accessToken, accessToken);
  },

  async clear() {
    memoryToken = null;
    memoryUser = null;
    await AsyncStorage.multiRemove([
    KEYS.accessToken,
    KEYS.refreshToken,
    KEYS.user,
    KEYS.profile]
    );
  },

  getOnboardingCompleted() {
    return AsyncStorage.getItem(KEYS.onboarding).then((v) => v === "1");
  },

  setOnboardingCompleted(completed) {
    return completed ?
    AsyncStorage.setItem(KEYS.onboarding, "1") :
    AsyncStorage.removeItem(KEYS.onboarding);
  },

  getSelectedProfileId() {
    return AsyncStorage.getItem(KEYS.profile);
  },

  setSelectedProfileId(profileId) {
    return profileId ?
    AsyncStorage.setItem(KEYS.profile, profileId) :
    AsyncStorage.removeItem(KEYS.profile);
  }
};

// --- app auth state (subscribed by React via useSyncExternalStore) ---


const listeners = new Set();

let state = {
  status: "loading",
  user: null,
  accessToken: null,
  selectedProfileId: null
};

function setState(partial) {
  state = { ...state, ...partial };
  listeners.forEach((l) => l());
}

export const auth = {
  getState: () => state,
  subscribe: (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  async hydrate() {
    setState({ status: "loading" });
    const [persisted, selectedProfileId] = await Promise.all([
    session.hydrate(),
    session.getSelectedProfileId()]
    );

    if (persisted) {
      setState({
        status: "authenticated",
        user: persisted.user,
        accessToken: persisted.accessToken,
        selectedProfileId
      });
      return;
    }

    setState({
      status: "unauthenticated",
      user: null,
      accessToken: null,
      selectedProfileId: null
    });
  },

  async signIn(input)



  {
    const selectedProfileId = input.selectedProfileId ?? null;
    await session.save({ ...input, selectedProfileId });
    setState({
      status: "authenticated",
      user: input.user,
      accessToken: input.accessToken,
      selectedProfileId
    });
  },

  async selectProfile(profileId, accessToken) {
    await session.setSelectedProfileId(profileId);
    if (accessToken) await session.updateToken(accessToken);
    setState({
      selectedProfileId: profileId,
      accessToken: accessToken ?? state.accessToken
    });
  },

  async signOut() {
    await session.clear();
    setState({
      status: "unauthenticated",
      user: null,
      accessToken: null,
      selectedProfileId: null
    });
  }
};