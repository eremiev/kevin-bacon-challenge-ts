# Kevin Bacon Coding Challenge

Welcome! Your task is to provide the implementation for an application that determines the "degrees of separation" between Kevin Bacon and other actors. 

## Evaluation Criteria

* Does the application function as per the requirements?
* Do the packaged tests pass?
* Is the code well-organized, modularized, and easy to follow?
* Does the code check/handle error/edge conditions?
* Are additional unit tests provided to cover areas of complexity?

## Getting Started

* Unzip `kevin-bacon-challenge-ts.zip`.
* Run `npm install apeloquin-agilysys-imdb-simulator-1.0.0.tgz` to initialize the project.
* Explore the project and start your implementation.
* Run `npm test` to execute included tests that are expected to pass.

## Notes

* We will be evaluating your solution using **Node v18.13.0**.
* Unsurprisingly, files with the header `DO NOT MODIFY THIS FILE` should be left alone.
* If you believe the test conditions in _index.test.ts_ to be inaccurate given the provided dataset, please provide your evidence with your submission.

## The Application

The application uses the IMDB API to find "degrees of separation" between Kevin Bacon and other actors.  We have provided a curated subset of IMDB API requests/responses via the included _imdb-simulator_ package.  

There are 3 shell commands which are detailed below. 

### load_kevin_bacons_history.sh

This command is used to explore the movie graph and persist data locally to be utilized by the other two shell commands. 

| Parameter | Value | Required | Description                                                                                                                                                                                                                    |
|---|------|---|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| --depth | 1-3  | true | Depth to explore the movie graph, where: <br/>_1_ includes only movies Kevin Bacon was in<br/>_2_ includes movies that Kevin Bacon's costars were in<br/>_3_ includes movies that Kevin Bacon's costars' costars were in |
| -v, --verbose | _N/A_ | false | Optional output (provided by you) to indicate what the application is doing during processing.                                                                                                                                 |


#### Example

```
$ ./load_kevin_bacons_history.sh --depth 1
78 actors tangentially connected to Kevin Bacon are loaded
```

### list_actors_names_we_now_know.sh

This command will list all actors identified in the previous _load_kevin_bacons_history.sh_ run by full name, alphabetically sorted.  It is expected that every name here will be recognized by the _degrees_away_from_kevin_bacon.sh_ command.

| Parameter | Value | Required | Description                                                                                                                                                                                                                    |
|---|------|---|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| -v, --verbose | _N/A_ | false | Optional output (provided by you) to indicate what the application is doing during processing.                                                                                                                                 |

#### Example
```
$ ./list_actors_names_we_now_know.sh 
AJ Zoldy
Aaron Pierre
Abbey Lee
Adaline Swanson
Adam Moryto
Ahmad Dugas
Aidan Bristow
Aisha Dee
Alana Jackson
```
Results in example are truncated for brevity, full list of actors should be provided in the output.

### degrees_away_from_kevin_bacon.sh

This command will look up the provided actor and identify the "degrees of separation" from Kevin Bacon, including the movies from the graph that define the degrees.

| Parameter        | Value  | Required | Description                                                                                    |
|------------------|--------|----------|------------------------------------------------------------------------------------------------|
| _{1st argument}_ | string | true     | Full name of actor to evaluate using **case-insensitive** matching.                            |
| -v, --verbose    | _N/A_  | false    | Optional output (provided by you) to indicate what the application is doing during processing. |

#### Examples

```
$ ./degress_away_from_kevin_bacon.sh "adaline swanson"
0 degrees
Space Oddity date 2022 Kevin Bacon, Adaline Swanson

$ ./degress_away_from_kevin_bacon.sh "Chris Johnson"
2 degrees
One Way date 2022 Kevin Bacon, Storm Reid
Missing date 2023 Storm Reid, Kimberly Cheng
Peppermint date 2018 Kimberly Cheng, Chris Johnson

```

## Submission

* We expect a response from you within 48 hours or so.  No worries if you’re not able to fully complete the challenge.  Please time box your efforts.  Working code we can test is highly preferred.
* In `submission.md`, write a statement on what is done, not working, unknown. This helps us understand what it will be like to work together. 
* Provide a ZIP archive of the project _without **node_modules**_ named _{firstName-lastName}-kevin-bacon-challenge-ts.zip_.
