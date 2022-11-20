//
//  inmemory.ts
//  nexus-prisma
//
//  Created by d-exclaimation on 19 Nov 2022
//

export class InMemoryStorage<Key, Value extends { id: Key }> {
  private storage: Map<Key, Value> = new Map();

  public get all() {
    return [...this.storage.values()];
  }

  public select(p: (arg0: [Key, Value]) => boolean) {
    return [...this.storage.entries()]
      .filter((value) => p(value))
      .map(([_, value]) => value);
  }

  public find(id: Key) {
    return this.storage.get(id) ?? null;
  }

  public findAll(ids: Key[]) {
    return ids.map((id) => this.find(id));
  }

  public insert(value: Value) {
    this.storage.set(value.id, value);
    return value;
  }

  public insertAll(values: Value[]) {
    values.forEach((value) => this.insert(value));
    return values;
  }

  public update(value: Value) {
    this.storage.set(value.id, value);
    return value;
  }

  public updateAll(ids: Key[], newValue: Omit<Value, "id">) {
    return ids
      .map((id) => this.find(id))
      .map((value) => {
        if (!value) return null;
        const res = value;
        this.storage.set(value.id, { ...value, ...newValue });
        return res;
      });
  }

  public updateFor(
    p: (arg0: [Key, Value]) => boolean,
    newValue: Omit<Value, "id">
  ) {
    return [...this.storage.entries()]
      .filter((value) => p(value))
      .map(([key, _]) => {
        const res = { id: key, ...newValue } as Value;
        this.storage.set(key, res);
        return res;
      });
  }

  public delete(id: Key) {
    return this.storage.delete(id);
  }

  public deleteAll(ids: Key[]) {
    return ids.map((id) => this.delete(id));
  }
}
