import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DEFAULT_CATEGORIES } from '.';

export type CategoryType = {
  id: number;
  name: string;
  icon: string;
  color: string;
};

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categoriesSubject = new BehaviorSubject<CategoryType[]>(
    DEFAULT_CATEGORIES,
  );
  categories$: Observable<CategoryType[]> = this.categoriesSubject.asObservable();

  get categories(): CategoryType[] {
    return this.categoriesSubject.getValue();
  }
}
