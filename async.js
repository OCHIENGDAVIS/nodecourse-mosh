console.log('Before');
getUSer(200, logUser);
console.log('After');

function getUSer(id, callback) {
  setTimeout(() => {
    console.log('Reading a user form a database');
    callback({
      id,
      githubName: 'gutHubRepo',
    });
  }, 2000);
  return 400;
}

function logUser(user) {
  console.log(`GIT username: ${user.githubName}, ID : ${user.id}`);
}
