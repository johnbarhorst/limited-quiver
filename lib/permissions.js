export function canDelete(req) {
  if(!req.user || req.user.id !== req.body.createdBy._id) {
    return false;
  }
  return true;
}