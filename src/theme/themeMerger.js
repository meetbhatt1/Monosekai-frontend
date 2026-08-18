const isPlainObject = (value) =>
  value !== null &&
  typeof value === "object" &&
  !Array.isArray(value);

export const deepMerge = (base, override) => {
  if (!isPlainObject(base)) {
    return override ?? base;
  }

  if (!isPlainObject(override)) {
    return { ...base };
  }

  const result = { ...base };

  Object.keys(override).forEach((key) => {
    const baseValue = base[key];
    const overrideValue = override[key];

    if (overrideValue === undefined || overrideValue === null) {
      return;
    }

    if (isPlainObject(baseValue) && isPlainObject(overrideValue)) {
      result[key] = deepMerge(baseValue, overrideValue);
    } else {
      result[key] = overrideValue;
    }
  });

  return result;
};

export const mergeTheme = (defaultTheme, remoteTheme) => {
  if (!remoteTheme) {
    return defaultTheme;
  }

  return deepMerge(defaultTheme, remoteTheme);
};