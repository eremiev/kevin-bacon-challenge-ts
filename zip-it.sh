#!/bin/bash

rm kevin-bacon-challenge-ts.zip
zip -r kevin-bacon-challenge-ts.zip *.tgz src/ test/ *.sh *.md *.json .mocharc.json
