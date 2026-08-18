const HEX_COLOR = /^#[0-9A-Fa-f]{6}$/;
const RGBA_COLOR =
  /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)$/;

const isColor = (value) =>
  typeof value === "string" &&
  (HEX_COLOR.test(value) || RGBA_COLOR.test(value));

const isPositiveNumber = (value) =>
  typeof value === "number" &&
  Number.isFinite(value) &&
  value >= 0;

const sanitizeObject = (remote, allowed) => {
  if (!remote || typeof remote !== "object") {
    return {};
  }

  const result = {};

  Object.keys(remote).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(allowed, key)) {
      result[key] = remote[key];
    }
  });

  return result;
};

export const validateRemoteTheme = (remoteTheme, defaultTheme) => {
  if (!remoteTheme || typeof remoteTheme !== "object") {
    return {};
  }

  const safeTheme = {};

  // COLORS
  if (remoteTheme.colors) {
    const allowedColors = sanitizeObject(
      remoteTheme.colors,
      defaultTheme.colors
    );

    safeTheme.colors = {};

    Object.entries(allowedColors).forEach(([key, value]) => {
      if (isColor(value)) {
        safeTheme.colors[key] = value;
      }
    });
  }

  // SPACING
  if (remoteTheme.spacing) {
    const allowedSpacing = sanitizeObject(
      remoteTheme.spacing,
      defaultTheme.spacing
    );

    safeTheme.spacing = {};

    Object.entries(allowedSpacing).forEach(([key, value]) => {
      if (isPositiveNumber(value) && value <= 128) {
        safeTheme.spacing[key] = value;
      }
    });
  }

  // RADIUS
  if (remoteTheme.radius) {
    const allowedRadius = sanitizeObject(
      remoteTheme.radius,
      defaultTheme.radius
    );

    safeTheme.radius = {};

    Object.entries(allowedRadius).forEach(([key, value]) => {
      if (isPositiveNumber(value) && value <= 999) {
        safeTheme.radius[key] = value;
      }
    });
  }

  // GRADIENTS
  if (remoteTheme.gradients) {
    const allowedGradients = sanitizeObject(
      remoteTheme.gradients,
      defaultTheme.gradients
    );

    safeTheme.gradients = {};

    Object.entries(allowedGradients).forEach(([key, value]) => {
      if (
        Array.isArray(value) &&
        value.length >= 2 &&
        value.length <= 4 &&
        value.every(isColor)
      ) {
        safeTheme.gradients[key] = value;
      }
    });
  }

  // COMPONENT CONFIGURATION
  if (remoteTheme.components) {
    safeTheme.components = {};

    Object.entries(remoteTheme.components).forEach(
      ([componentName, componentConfig]) => {
        if (
          !Object.prototype.hasOwnProperty.call(
            defaultTheme.components,
            componentName
          )
        ) {
          return;
        }

        const defaultConfig =
          defaultTheme.components[componentName];

        safeTheme.components[componentName] =
          sanitizeObject(componentConfig, defaultConfig);
      }
    );
  }

  // META
  if (remoteTheme.meta) {
    safeTheme.meta = {};

    if (typeof remoteTheme.meta.id === "string") {
      safeTheme.meta.id = remoteTheme.meta.id;
    }

    if (typeof remoteTheme.meta.version === "string") {
      safeTheme.meta.version = remoteTheme.meta.version;
    }
  }

  return safeTheme;
};