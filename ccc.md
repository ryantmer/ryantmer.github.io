---
layout: page
title: 3C
---

As you'll read in my [about]({{ site.baseurl }}/about) page, I am a firm believer that code should be written to be easy to read. Maybe PEP8 had a severe psychological impact on me, who knows, but considering most code is read several times for each time it is changed, this only makes sense. In light of this, I came up with three simple rules, which I call "Mahler's Three Rules That Start With The Letter C That Will Help You Write Delicious and Readable Code That Won't Make Others Hate You" (3C for short).

Note that these are entirely about readability. It's entirely possible to write terrible code while following these rules. But hey, at least it will be easy to read.

### 1. Consistency ###

A lot of the time, you're editing somebody else's code rather than writing new code. When doing so, be *consistent* with what has already been written. If the previous author is using CamelCase, don't switch\_to\_underscores. It's visually noisy and doesn't help any future developers follow what has been written.

### The Second C - Convention ###

Many languages have a style guide that outline basic *conventions* for how code should look. If you're writing new code, or rewriting existing code, this is where you should start. These styles guides don't change often, and this means that any future developers using the consistency guideline will be implicitly following the convention guideline as well!

### iii) Compulsion ###

Finally, if you're writing new code in a language that doesn't have a clearly-defined style guide (\*cough\*Java\*cough\*), then use your own *compulsion* to determine style. That said, be consistent to yourself in this case. Don't change from UPPERCASE to \_leading\_underscore for constants halfway through.

As a final point, notice how I used three different enumeration methods for the three rules? Notice how annoying it is? That's what happens to your code when you don't follow the 3C's.

And that's bad.
