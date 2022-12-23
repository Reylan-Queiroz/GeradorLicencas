import { Observable } from "rxjs";

export interface CrudOperations<T, ID> {
  create(t: T): Observable<T>;
  update(id: ID, t: T): Observable<T>;
  getById(id: ID): Observable<T>;
  getAll(): Observable<T>;
  delete(id: ID): Observable<T>;
}
