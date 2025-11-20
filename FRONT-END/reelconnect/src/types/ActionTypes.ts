export default interface ActionTypes<A> {
  type: string;
  payload: A;
}
