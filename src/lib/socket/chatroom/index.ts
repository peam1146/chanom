export async function findUserByName(name: string) {
  const users = await fetch("http://localhost:8000/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await users.json();
  console.log("Data: ", data); // "Data:  [ { name: 'user1' }, { name: 'user2' } ]"
  const user = data.find((user: { name: string }) => user.name === name);
  return user;
}
