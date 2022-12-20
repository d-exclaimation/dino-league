//
//  struct.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Dec 2022
//

/**
 * Infer the properties of a class of objects
 */
export type PropsOf<T extends Record<string, any>> = Omit<
  T,
  {
    [Key in keyof T]: T[Key] extends (...args: any[]) => any ? Key : never;
  }[keyof T]
>;

/**
 * Create a struct class
 * @param cl Class espression
 * @returns The same class with extra features such as constructor from object
 */
export const struct = <T extends new (...args: any[]) => any>(cl: T) =>
  class extends cl {
    static new(props: PropsOf<InstanceType<T>>): InstanceType<T> {
      return Object.assign(new this(), props);
    }
  };

/**
 * Construct a class from type-safe object
 * @param cl Class to be instantiated
 * @param props Class constructor arguments
 */
export function create<T extends new (...args: any[]) => any>(
  cl: T,
  props: PropsOf<InstanceType<T>>
): InstanceType<T> {
  return Object.assign(new cl(), props);
}
