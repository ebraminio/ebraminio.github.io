---
layout: default
---

## Posts [<img width="14" height="14" src="https://upload.wikimedia.org/wikipedia/en/4/43/Feed-icon.svg">](/feed.xml)

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date: "%Y-%m-%d" }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

----

## OpenGL
* [Tutorial 1](/extra/WebGL1.html), [Tutorial 2](/extra/WebGL2.html), [glcourse](https://github.com/ebraminio/glcourse)
* [An intro to modern OpenGL](http://duriansoftware.com/joe/An-intro-to-modern-OpenGL.-Table-of-Contents.html)
* [Anton's OpenGL 4 Tutorials](http://antongerdelan.net/opengl/)
* [WebGL Fundamentals](https://webglfundamentals.org)
* [WebGL2 Fundamentals](https://webgl2fundamentals.org/webgl/lessons/webgl-fundamentals.html)
* [Game Design](https://web.cse.ohio-state.edu/~crawfis.3/cse786/ReferenceMaterial/CourseNotes/)

## Complex Networks
* [Social Media Mining](http://dmml.asu.edu/smm/)
* [Barabasi's Network Science](http://barabasi.com/book)
* [van Steen's Graph Theory](https://www.distributed-systems.net/index.php/books/gtcn/)
* [graphbook](https://code.google.com/archive/p/graphbook/)
* [Snap](http://snap.stanford.edu)

## Other topics
* [Mining of Massive Datasets](http://www.mmds.org) (Big data)
* [Software Testing](http://cs.gmu.edu/~offutt/softwaretest/)
* [GPU Programming](http://courses.cms.caltech.edu/cs179/)
* [Introduction to Data Science](https://bcourses.berkeley.edu/courses/1267848/wiki)
* Search for "site:bcourses.berkeley.edu courses"

## Unsorted links
* [PDB-Downloader](https://ebraminio.github.io/PDB-Downloader/index.html)
* [curl pad.js.org &#124; node](http://pad.js.org)
* [Eigendecomposition](/extra/eigendecomposition.slides.html)
* [APK decompile](https://ilikekillnerds.com/2014/09/how-to-decompile-and-compile-android-apks-on-a-mac-using-apktool/)