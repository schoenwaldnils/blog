import md5 from 'md5'

export default function gravatarUrl(email, size = 80) {
  return `https://www.gravatar.com/avatar/${md5(email)}.jpg?s=${size}`
}
