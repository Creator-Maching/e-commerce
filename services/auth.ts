export function login(username: string, email: string, password: string) {
  const user = {
    username: username.trim(),
    email: email.trim().toLowerCase(),
    password: password.trim(),
  }

  localStorage.setItem("session", JSON.stringify(user))
  return user
}

export function getSession() {
  return JSON.parse(localStorage.getItem("session") || "null")
}

export function logout() {
  localStorage.removeItem("session")
}