/**
 * DO NOT MODIFY THIS FILE
 */

export interface LoadHistoryRequest {
  /**
   * relationship depth to traverse the movie storage
   * 1 includes only movies Kevin Bacon was in
   * 2 includes movies that Kevin Bacon's costars were in
   * 3 includes movies that Kevin Bacon's costars' costars were in
   */
  depth: number,

  /**
   * provide addition output to console during processing
   */
  verbose?: boolean
}

export interface ListActorsRequest {
  /**
   * provide addition output to console during processing
   */
  verbose?: boolean
}

export interface DegreesAwayRequest {
  /**
   * full name of an actor; does not need to be a case-sensitive match
   */
  name: string,

  /**
   * provide addition output to console during processing
   */
  verbose?: boolean
}