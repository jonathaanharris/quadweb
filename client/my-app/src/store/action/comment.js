import { COMMENT_FETCH_SUCCESS, BLOG_DETAIL_SUCCESS, FETCH_ERROR } from "./type";

export const fetchCommentById = (id) => {
  let err = false
  return (dispatch) => {
    return fetch(`http://localhost:8080/comments/${id}`)
      .then(res => {
        if (!res.ok) {
          err = true
        }
        return res.json()
      })
      .then(data => {
        if (err) return dispatch(fetchErr(data))
        return dispatch(fetchCommentSuccess(data))
      })
  }
}

export const addComment = (id, data) => {
  return (dispatch) => {
    return fetch(`http://localhost:8080/comments/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", token: localStorage.getItem('accessToken')
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok) {
          return res.json
        }
        return res.json().then(data => {
          throw new Error(data.message)
        })
      })
  }
}

export const deleteComment = (id) => {
  return (dispatch) => {
    return fetch(`http://localhost:8080/comments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", token: localStorage.getItem('accessToken')
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json
        }
        return res.json().then(data => {
          throw new Error(data.message)
        })
      })
  }
}
export const fetchCommentSuccess = (data) => {
  return {
    type: COMMENT_FETCH_SUCCESS,
    data
  }
}

export const fetchDetailSuccess = (data) => {
  return {
    type: BLOG_DETAIL_SUCCESS,
    data
  }
}
export const fetchErr = (data) => {
  return {
    type: FETCH_ERROR,
    data
  }
}