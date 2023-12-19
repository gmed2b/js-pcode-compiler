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

Exemple : `node compile.js programs/sum`

3. Exécutez le fichier compilé : `node exec.js [-v | --verbose] <pcode_file>`

Les fichiers compilés se trouvent dans le dossier `out/`.

Exemple : `node exec.js out/sum.pcode`

## Structure de Fichiers

Le projet peut être divisé en 4 parties :

- `Parser` : Analyse le code source et génère un JSON de l'arbre de syntaxe abstraite (AST).
- `Tokenizer` : Contient les règles de grammaire pour le langage.
- `Translator` : Traduit l'AST en PCODE.
- `Interpreter` : Interprète le PCODE.

## Captures d'écran

#### Programme `sum` avec notre langage

Programme qui permet de calculer la somme des nombres entrés par l'utilisateur tant que le nombre entré est différent de 0.

<img src="https://gelk.fr/static/compiler-screenshots/sum-program.png" alt="program sum" width="250"/>

#### Commande d'exécution

On peut voir que le programme `sum` a été compilé avec l'option `-v` pour afficher les informations de débogage.

<img src="https://gelk.fr/static/compiler-screenshots/compile-cmd.png" alt="program sum"/>

#### Sortie de la commande d'exécution

Avec l'option `-v`, on retrouve en sortie l'arbre de syntaxe abstraite (AST) du programme.

<img src="https://gelk.fr/static/compiler-screenshots/ast.png" alt="program sum"/>
<img src="https://gelk.fr/static/compiler-screenshots/compile-output.png" alt="program sum"/>

#### Exécution du programme compilé

Le programme compilé est exécuté et interprété.
L'utilisateur à entré les nombres 3, 3, 3 et 2. Puis il a entré 0 pour terminer le programme.
On peut voir que la somme des nombres entrés est bien égale à 11.

<img src="https://gelk.fr/static/compiler-screenshots/execution.png" alt="program sum"/>
