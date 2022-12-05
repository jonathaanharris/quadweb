import { BLOG_FETCH_SUCCESS, BLOG_DETAIL_SUCCESS, FETCH_ERROR } from "./type";

export const fetchAll = () => {
  let err = false
  return (dispatch) => {
    return fetch(`http://localhost:8080/blogs`)
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

export const updateContact = (data, id) => {
  return (dispatch) => {
    console.log(JSON.stringify(data), id, 388888)
    return fetch(`http://localhost:8080/contact/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('something went wrong')
        }
        return res.json
      })
      .then(data => {
        return data
      })
  }
}
export const addContact = (data) => {
  return (dispatch) => {
    console.log(JSON.stringify(data))
    return fetch('http://localhost:8080/contact', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('something went wrong')
        }
        return res.json
      })
      .then(data => {

        return data
      })
  }
}

export const deleteContact = (data) => {
  return (dispatch) => {
    return fetch(`http://localhost:8080/contact/${data}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('something went wrong')
        }
        return res.json
      })
      .then(data => data)
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