import semver from "semver";

/**
 * Compare app version with  flbujo file version, perform data migrations if necessary
 */
export const performMigrations = (data) => {
  const flbujoFileVersion = data.metadata.version;

  if (semver.lt(flbujoFileVersion, "2.0.0")) {
    // return migrateToMarkdown(data);
  }
  return data;
};

/**
 * v2.0.0: Migrate plain text entries to Markdown entries (replace \n with \n\n)
 */
export const migrateToMarkdown = (data) => {
  const { metadata, entries } = data;
  const dataMigrated = {
    metadata,
    entries: {},
  };

  // Replace \n with \n\n in the text part of all diary entries
  Object.entries(entries).forEach(([indexDate, entry]) => {
    const { text } = entry;
    const entryUpdated = {
      ...entry,
      text: text.replace(/\n/g, "\n\n"),
    };
    dataMigrated.entries[indexDate] = entryUpdated;
  });

  return dataMigrated;
};
