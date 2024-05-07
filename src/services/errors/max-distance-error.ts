export class MaxDistanceError extends Error {
  constructor() {
    super('You are outside the max distance range to check in in this gym.')
  }
}
