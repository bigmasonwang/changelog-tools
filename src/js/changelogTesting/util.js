// change '- [AB-123] some thing' to [{ id: 'AB-123', desc: 'some thing' }]
// change '- [AB-123] some thing\n- [AB-456] some other thing' to [{ id: 'AB-123', desc: 'some thing' }, { id: 'AB-456', desc: 'some other thing' }]
export const parseChangelog = (changelog) => {
  if (!changelog) {
    return null;
  }
  const regex = /- \[(.*?)\] (.*)/g;
  const parsed = [];
  let match = regex.exec(changelog);
  while (match != null) {
    parsed.push({ id: match[1], desc: match[2] });
    match = regex.exec(changelog);
  }
  return parsed;
};

export const formatChangelog = ({ changelogArray, projectManagerBaseUrl }) => {
  if (!changelogArray) {
    return null;
  }
  const url = (projectManagerBaseUrl, ticketId) =>
    projectManagerBaseUrl &&
    `<a href="${projectManagerBaseUrl}/${ticketId}" target="_blank">${ticketId}</a>`;
  return changelogArray
    .map(
      (item) =>
        `<details><summary>${item.id} ${item.desc}</summary><div>${url(
          projectManagerBaseUrl,
          item.id
        )} <p>comment</p></div></details>`
    )
    .join("\n");
};
