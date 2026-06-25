export function errorMiddleware(err: any, _req: any, res: any, _next: any) {
  console.error(err);

  return res.status(500).json({
    message: "Internal Server Error",
  });
}