

const DEFAULT_PAGE =1;
const DEFAULT_LIMIT = 0

function getPagination(params) {
    const page = Math.abs(params.page)||DEFAULT_PAGE
    const limit = Math.abs(params.limit)||DEFAULT_LIMIT
    const skip = (page-1)*limit;
    return{
        skip,
        limit
    }

    
}
module.exports = getPagination