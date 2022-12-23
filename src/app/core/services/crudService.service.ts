import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrudOperations } from 'src/app/shared/interfaces/CrudOperations';

export abstract class CrudService<T, ID> implements CrudOperations<T, ID> {
  constructor(protected _http: HttpClient, protected _base: string) { }

  create = (t: T): Observable<T> => this._http.post<T>(this._base + '/create', t);
  update = (id: ID, t: T): Observable<T> => this._http.put<T>(this._base + '/' + id, t);
  getById = (id: ID): Observable<T> => this._http.get<T>(this._base + '/' + id);
  getAll = (): Observable<T> => this._http.get<T>(this._base);
  delete = (id: ID): Observable<T> => this._http.delete<T>(this._base + '/' + id);
}
