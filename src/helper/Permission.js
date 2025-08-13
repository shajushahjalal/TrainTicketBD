export const checkPermission = (permission_key) => {
  if(permission_key?.length > 0){
    // Checking Permission
    return true;
  }else{
    return false;
  }
}