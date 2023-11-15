


export function getCurrentAdmin() {
    let adminInfo
    try {
      adminInfo = JSON.parse(sessionStorage.getItem('admin') as string)
    } catch (error) {
      console.log(error);
      
    }
    const currentAdmin = adminInfo || {}
    return currentAdmin
}