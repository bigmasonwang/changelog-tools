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

export const formatChangelog = (changelog) => {
  if (!changelog) {
    return null;
  }
  return changelog
    .map(
      (item) =>
        `<details><summary>${item.id} ${item.desc}</summary><p>comment</p></details>`
    )
    .join("\n");
};
