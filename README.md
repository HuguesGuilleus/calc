Projet Calculatrice
====================

N'ayant pas précisé le langage à utiliser nous avons décider d'utiliser le bash, le JavaScript et le PHP pour réaliser cette calculatrice. Cela nous a permis de s'entraîner sur ces différents langages. Afin d'obtenir des comportements similaires, nous avons écrit une série de test pour chaque étape et le programme `test.bash` lancer ces testes.

## Version
|    Langage | Extension | Implémentation | Version         |
| ---------: | :-------- | :------------- | :-------------- |
|       bash | .bash     | GNU bash       | version 4.3.48  |
| JavaScript | .js       | NodeJs         | version 10.15.1 |
|        PHP | .php      | PHP            | version 7.0.33  |

## Exercices
- Exercice 1: Réalise les quatre opérations sur deux entiers.
- Exercice 2: Identification des types.
- Exercice 3: Calculs élémentaires.
- Exercice 4: Test de la syntaxe sans les parenthèses.
- Exercice 5: Test de la syntaxe avec les parenthèses.
- Exercice 6: Calcule d'expression sans la priorités des opérateurs et sans les parenthèses.
- Exercice 6+: Calcule d'expression avec la priorités des opérateurs et sans les parenthèses.
- Exercice 7: Calcule d'expression sans la priorités des opérateurs et avec un niveau de parenthèses
- Exercice 8: Calcule avec la priorité des opérateurs et avec les parenthèses.
- calc: Calculatrice finale basée sur les tests de syntaxe de l'exercice 5 et le calcule de l'exercice 8.
### Arbre de dépendance
```
1  2
├──┼─┬──┐
3  │ 4  5
│  │    │
6  ├──┐ │
├──┤  │ │
│  7  │ │
│     │ │
├─────┤ │
6+    │ │
├─────┘ │
8       │
├───────┘
calc
```

## Fichier de test
Afin que les différentes implémentations aient le même comportement, nous avons écrit environ 80 tests, et nous avons créé le programme `test.bash` qui sert à les lancer. Le répertoire hello/ contient des programmes qui affiche «Hello Word» ce qui permet de vérifier que le langage est bien supporté. Les fichiers de test sont situés dans le répertoire dataTest/ et dans un sous-répertoire correspondant à l'exercice, il sont constitués de:
1. Nom du test
2. Nom du programme testé sans l'extension
3. Les arguments à passer au programme
4. Le code de sortie
5. La sortie `stdout` attendue
6. (Facultatif) Une ligne vide qui sert de séparateur
7. (Facultatif) La sortie `stderr` attendue
