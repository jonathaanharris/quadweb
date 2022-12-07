import { BLOG_FETCH_SUCCESS, BLOG_DETAIL_SUCCESS, FETCH_ERROR } from "./type";

export const fetchAll = (obj) => {
  const qParam = '?' + new URLSearchParams(obj).toString();
  let err = false
  return (dispatch) => {
    return fetch(`http://localhost:8080/blogs${qParam}`)
      .then(res => {
        if (!res.ok) {
          err = true
        }
        return res.json()
      })
      .then(data => {
        if (err) return dispatch(fetchErr(data))
        return dispatch(fetchBlogSuccess(data))
      })
  }
}

export const fetchById = (id) => {
  let err = false
  return (dispatch) => {
    return fetch(`http://localhost:8080/blogs/${id}`)
      .then(res => {
        if (!res.ok) {
          err = true
        }
        return res.json()
      })
      .then(data => {
        if (err) return dispatch(fetchErr(data))
        return dispatch(fetchDetailSuccess(data))
      })
  }
}

export const addBlog = (data) => {
  return (dispatch) => {
    return fetch('http://localhost:8080/blogs', {
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

export const updateBlog = (id, data) => {
  return (dispatch) => {
    return fetch(`http://localhost:8080/blogs/${id}`, {
      method: "PUT",
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

export const deleteBlog = (id) => {
  return (dispatch) => {
    return fetch(`http://localhost:8080/blogs/${id}`, {
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

export const fetchBlogSuccess = (data) => {
  return {
    type: BLOG_FETCH_SUCCESS,
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