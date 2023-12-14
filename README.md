# Compilateur et Interpréteur de Pcode JavaScript

Ce projet resulte d'un TP fait dans le cadre du cours de Compilation lors de ma formation en Licence 3 Informatique à l'Université de Corse.
C'est est un compilateur et interpréteur de PCODE fait en JavaScript.

## Installation

Pour utiliser le Compilateur et Interpréteur, suivez ces étapes :

1. Clonez le dépôt : `git clone https://github.com/gmed2b/js-pcode-compiler.git`
2. Assurez-vous d'avoir [Node.js](https://nodejs.org/en/) sur votre machine.

## Utilisation

1. Compilez un programme : `node compile.js [-v | --verbose] <program_file>`

Vous disposez d'une liste de programmes d'exemple dans le dossier `programs/`.
Le programme compilé sera généré dans le dossier `out/`. Le nom du fichier sera le même que celui du fichier d'entrée, mais avec l'extension `.pcode`.

3. Exécutez le fichier compilé : `node exec.js [-v | --verbose] <pcode_file>`

Les fichiers compilés se trouvent dans le dossier `out/`.

## Structure de Fichiers

Le projet peut être divisé en 4 parties :

- `Parser` : Analyse le code source et génère un JSON de l'arbre de syntaxe abstraite (AST).
- `Tokenizer` : Contient les règles de grammaire pour le langage.
- `Translator` : Traduit l'AST en PCODE.
- `Interpreter` : Interprète le PCODE.
