export function tenantMiddleware(req: any, _res: any, next: any) {
  // MVP: fijo
  req.slug = "nexo";

  next();
}