# FlashQuiz


FlashQuiz is a minimalistic flash card app.
Users can create/delete cards.
Users can quiz themselves in a timed, point-based environment.
Compete to earn the highest score.

Multiplier for time to reach a correct answer:

* 0-10 seconds: 1
* 11-20 seconds: .9
* 20-30 seconds: .8 30 seconds: .75


Multiplier for # of attempts:

* 1: 1
* 2: .75
* 3: .5


There is a test seed file.

`rake db:create`
`rake db:migrate`
`rake db:seed`