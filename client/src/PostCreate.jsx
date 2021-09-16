import React from 'react'

const PostCreate = () => {
    return (
        <React.Fragment>
             <form>
                 <div className="form-group">
                     <label>Title</label>
                     <input className="form-control"/>
                 </div>
                 <button>Submit</button>
             </form>
        </React.Fragment>
    )
}

export default PostCreate
