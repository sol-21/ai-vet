// @ts-nocheck
async function getUser() {
  return { id: 1, name: 'Test User' };
}

export async function processUsers() {
  const user = getUser(); // Call without await

  const data = [1, 2, 3];
  data.forEach(async (id) => {
    await getUser(id); // await inside forEach loop (no-op)
  });
}
