<h1>The Hilton Project</h1>

<h2>Background</h2>
<p>Most of us get a dog and think the only thing we will need to train them on is basic obedience - sit, stay, don't pull me down a hill if you see a squirrel...</p>

<p>But dogs, like people, each have their own genetic makeup and history that causes them to have their own feelings about the world around them.  My dog, Hilton, is one of many that we might define as reactive or simply, anxious.  For Hilton, this means that when he sees another dog while out on a walk, his innate reaction is to vocalize (loudly!) and sometimes lunge toward the other dog.  This is distance creating behavior, his way of telling the other dog to go away, but it can be scary for all parties and is generally not ideal.</p>

<p>The training for fear based behaviors can look a bit different from "regular" training, as we are trying to change the way the dog feels about the trigger.  An important piece of the puzzle, to know if our training is working, is to keep track of the data.  That is, each time he sees a trigger, how far away was it, how big was his reaction, how quickly was he able to recover, and so forth.  Ideally over time, these numbers will decrease, meaning he will be able to be closer to dogs, have smaller reactions, and recover more quickly.</p>

<h2>Solution</h2>
<p>The Hilton Project offers a way to track this training progress, to store all the data so the human can look back on it and see all the progress that has been made, or know when to switch things up if the training isn't progressing.</p>

<h2>Getting Started</h2>
Install dependencies:

```js
npm install
```

Create your MongoDB database and google maps API key

Set your .env variables:
<ul>
  <li>MONGO_URI</li>
  <li>GOOGLE_API_KEY</li>
</ul>

<h2>User Guide</h2>
<p>The UI of the app is a simple form.  Simply record events as they happen by inputting the event date and time, selecting the type of trigger your dog encountered, rating the intensity of your dog's reaction on a scale of 0-5, and then marking the locations of your dog as well as the trigger on the map, which will allow the application to calculate and store the distance.</p>

<p>To set the locations, click the Set on Map button next to Location A.  Mark the location of your dog.  The app will automatically switch to Location B, so you can simply click on the map a second time to mark the location of the trigger.  You may optionally provide a nickname for either location before clicking submit.  If you need to alter either location, simply click the corresponding Set on Map button and click on the map to make the adjustment.</p>
<p align="center">
<img width="455" alt="Screen Shot 2023-05-24 at 2 02 29 PM" src="https://github.com/melissamcl/the-hilton-project/assets/113558917/772f5b24-c23a-44f2-9803-aae976080fc5">
</p>

<h2>Next Iteration</h2>
Currently the app is set up to store data, but I have not built the functionality to view historical data that has been saved.  I would also like to implement a feature to select from a list of saved locations, as many dogs and their owners have a common route that they walk and it may not be necessary to select from the map each time.
