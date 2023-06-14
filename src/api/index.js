import { createHashHistory } from 'history'

let history = createHashHistory()

export const goto = (path) => {
  history.push(path)
}
