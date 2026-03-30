export class NotFoundError extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.status = 404; // código HTTP para "No encontrado"
    this.name = "NotFoundError";
  }
}