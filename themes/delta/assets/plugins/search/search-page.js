summaryInclude = 60;
var fuseOptions = {
  shouldSort: true,
  includeMatches: true,
  threshold: 0.2,
  tokenize: true,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    {
      name: "title",
      weight: 0.8,
    },
    {
      name: "searchKeyword",
      weight: 0.9,
    },
    {
      name: "content",
      weight: 0.5,
    },
    {
      name: "description",
      weight: 0.3,
    },
  ],
};

var content = param("c");
var searchQuery = param("s");
if (searchQuery && content) {
  $("#search-by").val(searchQuery);
  $("#search-content").val(content);
  executeSearch({searchQuery: searchQuery, content: content});
}

function executeSearch({searchQuery, content}) {
  $.getJSON(indexURL, function (data) {
    var pages = data;
    var fuse = new Fuse(pages, fuseOptions);
    var result = fuse.search(searchQuery);
    
    if (result.length > 0) {
      result.forEach(function (el) {
        if ((content == "licensing-terms-conditions") && ("Licensing terms conditions" == el.item.section)){
          populateResults(el);
        }

        if ((content == "learning-center") && ("Learning center" == el.item.section)){
          populateResults(el);
        }
      });
    } else {
      $("#search-results").append(
        '<div class="text-center"><img class="img-fluid" src="https://user-images.githubusercontent.com/58769763/75105664-632cd680-5640-11ea-94e0-127848a702df.png"><h3>No Search Found</h3></div>'
      );
    }
  });
}

function populateResults(el) {
  $.each(el, function (key, value) {
    var checkArray = Array.isArray(value);
    if (checkArray != true) {
      var content = value.content;
      var snippet = "";
      var snippetHighlights = [];
      if (fuseOptions.tokenize) {
        snippetHighlights.push(searchQuery);
      } else {
        $.each(value.matches, function (matchKey, mvalue) {
          if (mvalue.key == "content") {
            start =
              mvalue.indices[0][0] - summaryInclude > 0
                ? mvalue.indices[0][0] - summaryInclude
                : 0;
            end =
              mvalue.indices[0][1] + summaryInclude < content.length
                ? mvalue.indices[0][1] + summaryInclude
                : content.length;
            snippet += content.substring(start, end);
            snippetHighlights.push(
              mvalue.value.substring(
                mvalue.indices[0][0],
                mvalue.indices[0][1] - mvalue.indices[0][0] + 1
              )
            );
          }
        });
      }

      if (snippet.length < 1) {
        snippet += content.substring(0, summaryInclude * 2);
      }
      //pull template from hugo templarte definition
      var templateDefinition = $("#search-result-template").html();
      //replace values
      var output = render(templateDefinition, {
        key: key,
        title: value.title,
        link: value.url,
        snippet: snippet,
      });
      $("#search-results").append(output);

      $.each(snippetHighlights, function (snipkey, snipvalue) {
        $("#summary-" + key).mark(snipvalue);
      });
    }
  });
}

function param(name) {
  return decodeURIComponent(
    (location.search.split(name + "=")[1] || "").split("&")[0]
  ).replace(/\+/g, " ");
}

function render(templateString, data) {
  var conditionalMatches, conditionalPattern, copy;
  conditionalPattern = /\$\{\s*isset ([a-zA-Z]*) \s*\}(.*)\$\{\s*end\s*}/g;
  //since loop below depends on re.lastInxdex, we use a copy to capture any manipulations whilst inside the loop
  copy = templateString;
  while (
    (conditionalMatches = conditionalPattern.exec(templateString)) !== null
  ) {
    if (data[conditionalMatches[1]]) {
      //valid key, remove conditionals, leave content.
      copy = copy.replace(conditionalMatches[0], conditionalMatches[2]);
    } else {
      //not valid, remove entire section
      copy = copy.replace(conditionalMatches[0], "");
    }
  }
  templateString = copy;
  //now any conditionals removed we can do simple substitution
  var key, find, re;
  for (key in data) {
    find = "\\$\\{\\s*" + key + "\\s*\\}";
    re = new RegExp(find, "g");
    templateString = templateString.replace(re, data[key]);
  }
  return templateString;
}
