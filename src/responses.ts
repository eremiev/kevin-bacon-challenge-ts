/**
 * DO NOT MODIFY THIS FILE
 */

export interface LoadHistoryResponse {
  /**
   * count of actors that have been loaded that have a direct or indirect relationship to Kevin Bacon; excluding
   * Kevin Bacon
   */
  actorCount: number
}

export interface ListActorsResponse {
  /**
   * list of actors (full names) in alphabetical order (string sort); excluding Kevin Bacon
   */
  actors: string[]
}


export interface DegreesAwayResponse {
  /**
   * -1 if the specified actor is unknown
   * 0 if the specified actor starred in a movie with Kevin Bacon
   * 1 if the specified actor starred with someone who starred in a movie with Kevin Bacon
   * 2 if the specified actor starred with someone who starred with someone who starred in a movie with Kevin Bacon
   */
  degrees: number,

  /**
   * movies that link the actor to Kevin Bacon if the degree >= 0; the movie with Kevin Bacon should be listed
   * first and the movie the specified actor was in last (unless they are the same movie).
   */
  movies?: LinkedMovie[]
}

export interface LinkedMovie {
  /**
   * title of the movie
   */
  title: string,

  /**
   * year the movie was released, if known
   */
  year?: number,

  /**
   * actor closest to Kevin Bacon (or Kevin Bacon)
   */
  innerActor: string,

  /**
   * actor closest to the specified actor (or the specified actor)
   */
  outerActor: string
}
