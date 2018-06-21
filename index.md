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

## TrueType/OpenType/AAT related quick links
* [Microsft OpenType Specication](https://docs.microsoft.com/en-us/typography/opentype/spec/glyf)
* [Apple AAT Specification](https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6just.html)
* [fonttools](https://github.com/fonttools/fonttools/tree/master/Lib/fontTools/ttLib/tables)
* [fontkit](https://github.com/devongovett/fontkit/tree/master/src/tables) ([aat-kern branch](https://github.com/devongovett/fontkit/tree/aat-kern/src/tables))
* [opentype.js](https://github.com/nodebox/opentype.js/blob/master/src/tables/cff.js)
* [freetype](https://github.com/personal-mirrors/freetype2)
* [harfbuzz](https://github.com/harfbuzz/harfbuzz/tree/master/src)

## IO
* [WebAssembly Out of Bounds Trap Handling](https://docs.google.com/document/d/17y4kxuHFrVxAiuCP_FFtFA2HP5sNPsCD10KEx17Hz6M/edit)
* [aix-nio](https://github.com/dmlloyd/openjdk/tree/jdk/jdk/src/java.base/aix/native/libnio)
* [linux-nio](https://github.com/dmlloyd/openjdk/tree/jdk/jdk/src/java.base/linux/native/libnio)
* [macosx-nio](https://github.com/dmlloyd/openjdk/tree/jdk/jdk/src/java.base/macosx/native/libnio)
* [solaris-nio](https://github.com/dmlloyd/openjdk/tree/jdk/jdk/src/java.base/solaris/native/libnio)
* [unix-nio](https://github.com/dmlloyd/openjdk/tree/jdk/jdk/src/java.base/unix/native/libnio)
* [windows-nio](https://github.com/dmlloyd/openjdk/tree/jdk/jdk/src/java.base/windows/native/libnio)
* [pipe](https://github.com/cgaebel/pipe)
* [classpath-nio](https://github.com/penberg/classpath/tree/master/native/jni/java-nio)
* [System Programming](https://github.com/angrave/SystemProgramming/wiki)
* [UNIX Lecture Notes](http://www.compsci.hunter.cuny.edu/~sweiss/course_materials/unix_lecture_notes/)

## OpenGL
* [Tutorial 1](/extra/WebGL1.html), [Tutorial 2](/extra/WebGL2.html), [glcourse](https://github.com/ebraminio/glcourse) (mine)
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

## Music related
* [Tuner / Metronome / Signal Generator](/extra/tuner.html) (mine)
* Android Simple Synthesizer: [1](https://github.com/ebraminio/simplesynth) [2](https://github.com/ebraminio/oldsimplesynth) (mine)
* [midi protocol](https://www.midi.org/specifications/item/table-1-summary-of-midi-message)

## Blockchain
* [naivechain](https://medium.com/@lhartikk/a-blockchain-in-200-lines-of-code-963cc1cc0e54)
* [naivecoin](https://github.com/conradoqg/naivecoin)

## Other topics
* [Mining of Massive Datasets](http://www.mmds.org) (Big data)
* [Software Testing](http://cs.gmu.edu/~offutt/softwaretest/)
* [GPU Programming](http://courses.cms.caltech.edu/cs179/)
* [Introduction to Data Science](https://bcourses.berkeley.edu/courses/1267848/wiki)
* Search for "site:bcourses.berkeley.edu courses"
* [Quantum Development Kit Documentation](https://docs.microsoft.com/en-us/quantum/)
* [Blockchain](https://github.com/conradoqg/naivecoin)
* [PDB-Downloader](https://ebraminio.github.io/PDB-Downloader/index.html) (mine)
* [curl pad.js.org &#124; node](http://pad.js.org) (mine)
* [Eigendecomposition](/extra/eigendecomposition.slides.html) (mine)
* APK decompile: [1](https://blog.bramp.net/post/2015/08/01/decompile-and-recompile-android-apk/), [2](https://ilikekillnerds.com/2014/09/how-to-decompile-and-compile-android-apks-on-a-mac-using-apktool/)
