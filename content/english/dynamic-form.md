---
title: "Dynmic Form"
---

<div class="row not-prose mb-4">
  <div class="col-xl-6 mx-auto">
    {{< form background=`#1D1F26` style=`rounded-boxed` netlify=true conditional-form=true >}}
      {{< input-text label=`Your Name` id=`name` name=`name` required=true placeholder=`muhammad sumon` >}}
      {{< input-text label=`Email` id=`email` name=`email` type=`email` required=true placeholder=`muhammad@gmail.com` >}}

      {{< select title=`Reason For Contacting` id=`reason-for-contacting` required=true condition=`match/Question:specific-question;match/Feedback:feedback` name=`reason-for-contacting` >}}
        {{< select-option label=`Select an option` value=`` selected=true disabled=true >}}
        {{< select-option value=`Question` >}}
        {{< select-option value=`Feedback` >}}
        {{< select-option value=`Other` >}}
      {{< /select >}}
      
      {{< input-text label=`Specific Question` id=`specific-question` required=true name=`specific-question` conditional-element=true >}}
      
      {{< input-textarea label=`Feedback` id=`feedback` required=true name=`feedback` placeholder=`you feedback` conditional-element=true >}}
      
      {{< button-submit value=`Submit` width=`full` >}}

    {{< /form >}}
  </div>
</div>

<br/>

### Feedback Form {.text-center}

<div class="row not-prose">
  <div class="col-xl-6 mx-auto">
    {{< form background=`#1D1F26` style=`rounded-boxed` conditional-form=true >}}
      {{< input-group title=`How would you rate your experience with us?` >}}
        {{< input-check label=`Bad` required=true type=`radio` id=`bad` name=`experience` condition=`checked:negative` value=`bad` >}}
        {{< input-check label=`Fair` required=true type=`radio` id=`fair` name=`experience` condition=`checked:negative` value=`fair` >}}
        {{< input-check label=`Good` required=true type=`radio` id=`good` name=`experience` condition=`checked:positive` value=`good` >}}
        {{< input-check label=`Very good` required=true type=`radio` id=`veryGood` name=`experience` condition=`checked:positive` value=`very_good` >}}
        {{< input-check label=`Excellent` required=true type=`radio` id=`excellent` name=`experience` condition=`checked:testimonial-propose` value=`excellent` >}}
      {{< /input-group >}}

      {{< input-text label=`We're sorry to hear you had a bad experience. What went wrong?` id=`negative` required=true name=`feedback` placeholder=`` conditional-element=true >}}

      {{< input-text label=`Please tell us what you liked and how we can improve:` id=`positive` name=`feedback` placeholder=`` required=true conditional-element=true >}}

      {{< input-group title=`Wonderful! We're so glad to hear that. Would you be willing to write a customer comment for our website?` id=`testimonial-propose` conditional-element=true >}}
        {{< input-check label=`Sure!` required=true type=`radio` id=`want-to-comment` name=`is-agreed-for-testimonial` condition=`checked:leave-a-comment` value=`yes` >}}
        {{< input-check label=`I'd rather not.` required=true type=`radio` id=`dont-want-to-comment` name=`is-agreed-for-testimonial` condition=`checked:no-problem` value=`no` >}}
      {{< /input-group >}}

      {{< input-textarea label=`Thank you so much! Please leave your testimonial here:` id=`leave-a-comment` required=true name=`testimonial` conditional-element=true >}}
      
      {{< note value=`No problem, thanks for being a customer!` id=`no-problem` conditional-element=true >}}
      
      {{< button-submit value=`Submit` width=`full` >}}
    {{< /form >}}
  </div>
</div>

<br/>
<br/>
<br/>

### Empower Engineers - Service Request Form {.mb-2}

<div class="row not-prose">
  <div class="col-xl-6">
    {{< form background=`#1D1F26` style=`rounded-boxed` conditional-form=true >}}
      {{< select title=`What can we help you with?` required=true id=`service_type` condition=`match/Launch New Product:product-details;match/Cloud Adoption:cloud-adoption-fields;match/Cloud Adoption:issue-description;match/Technical Support:tech-support-field;match/Other:other-field` name=`service-type` >}}
        {{< select-option label=`Select an option` value=`` disabled=true selected=true >}}
        {{< select-option value=`Launch New Product` >}}
        {{< select-option value=`Cloud Adoption` >}}
        {{< select-option value=`Technical Support` >}}
        {{< select-option value=`Other` >}}
      {{< /select >}}

      {{< comment `For Launch New Product Option` >}}
      {{< input-textarea label=`Product Details` id=`product-details` required=true name=`product-details` conditional-element=true >}}

      {{< comment `For Cloud Adoption Option` >}}
      {{< input-group title=`` id=`cloud-adoption-fields` conditional-element=true >}}
        {{< input-text label=`Current Technology Stack` required=true name=`current-tech-stack` >}}
        {{< input-text label=`Desired Cloud Technology` required=true name=`desired-cloud-tech` >}}
      {{< /input-group >}}

      {{< comment `For Technical Support Option` >}}
      {{< input-textarea label=`Issue Description` id=`tech-support-field` required=true name=`support-query` conditional-element=true >}}

      {{< comment `For Other Option` >}}
      {{< input-textarea label=`Please Describe Your Needs` id=`other-field` required=true name=`other-details` conditional-element=true >}}

      {{< button-submit value=`Submit` >}}
    {{< /form >}}
  </div>
</div>

<br/>

#### Project Initiation Form {.mb-2}

<div class="row not-prose">
  <div class="col-xl-6">
    {{< form background=`#1D1F26` style=`rounded-boxed` conditional-form=true >}}

    {{< select title=`Type of Feedback` id=`feedback-type` name=`feedback-type` required=true condition=`match/product:product-feedback-fields;match/service:service-feedback-fields;match/website:website-feedback-fields;match/other:other-details` >}}
        {{< select-option label=`Select an option` value=`` selected=true disabled=true >}}
        {{< select-option value=`product` >}}
        {{< select-option value=`service` >}}
        {{< select-option value=`website` >}}
        {{< select-option value=`other` >}}
    {{< /select >}}

    {{< input-group title=`` id=`product-feedback-fields` conditional-element=true >}}
      {{< input-text required=true label=`Product Name` id=`product-name` name=`product-name` >}}
      {{< input-textarea required=true label=`Your Experience` id=`product-experience` name=`product-experience` >}}
    {{< /input-group >}}

    {{< input-group title=`` id=`service-feedback-fields` conditional-element=true >}}
      {{< input-text required=true label=`Service Name` id=`service-name` name=`service-name` >}}
      {{< input-textarea required=true label=`Your Experience` id=`service-experience` name=`service-experience` >}}
    {{< /input-group >}}

    {{< input-group title=`` id=`website-feedback-fields` conditional-element=true >}}
      {{< input-text required=true label=`Part of the Website` id=`website-part` name=`website-part` >}}
      {{< input-textarea required=true label=`Your Experience` id=`website-experience` name=`website-experience` >}}
    {{< /input-group >}}

    {{< input-textarea required=true label=`Please Describe Your Feedback` id=`other-details` name=`other-details` conditional-element=true >}}

    {{< button-submit value=`Submit` >}}

    {{< /form >}}
  </div>
</div>

#### Selecting Web Design Themes

<div class="row g-0 not-prose">
  <div class="col-xl-6">
    {{< form background=`#1D1F26` style=`rounded-boxed` conditional-form=true >}}
      {{< input-group title=`Which type of theme would you like?` >}}
        {{< input-check type=`checkbox` label=`Modern` required=true id=`modern` name=`theme-style` condition=`checked:modern-style` value=`Modern` >}}
        {{< input-check type=`checkbox` label=`Classic` required=true id=`classic` name=`theme-style` condition=`checked:classic-style` value=`Classic` >}}
        {{< input-check type=`checkbox` label=`Creative` required=true id=`creative` name=`theme-style` condition=`checked:creative-style` value=`Creative` >}}
      {{< /input-group >}}

      {{< input-image-preview src="images/modern-web.png" width="1920" parent-size=`600x400` title=`Modern Website UI` id=`modern-style` conditional-element=true >}}
      {{< input-image-preview src="images/classic-web.png" width="1920" parent-size=`600x400` title=`Classic Website UI` id=`classic-style` conditional-element=true >}}
      {{< input-image-preview src="images/creative-web.png" width="1920" parent-size=`600x400` title=`Creative Website UI` id=`creative-style` conditional-element=true >}}

      {{< button-submit value=`Submit` >}}
    {{< /form >}}
  </div>
</div>

#### Calculating Project Cost

<div class="row g-0 not-prose">
  <div class="col-xl-6">
    {{< form background=`#1D1F26` style=`rounded-boxed` conditional-form=true >}}
      {{< input-group >}}
        {{< comment `available calc condition is calc/add, calc/sub, calc/mul, calc/div` >}}
        {{< input-check
          type=`checkbox`
          label=`Website Development ($15)`
          id=`website-development`
          name=`website-development`
          condition=`calc/add:project-cost`
          value=`15` >}}
        {{< input-check
          type=`checkbox`
          label=`SEO Optimization ($10)`
          id=`seo-optimization`
          name=`seo-optimization`
          condition=`calc/add:project-cost`
          value=`10` >}}
        {{< input-check
          type=`checkbox`
          label=`E-commerce Integration ($5)`
          id=`e-commerce`
          name=`e-commerce`
          condition=`calc/add:project-cost`
          value=`5` >}}
      {{< /input-group >}}

      {{< input-calc-result title=`Total Cost` append=`$` prepend=`` id=`project-cost` conditional-element=true >}}

      {{< button-submit value=`Submit` >}}
    {{< /form >}}
  </div>
</div>

<br/>
<br/>
<br/>

#### Estimating Project Duration

Formula <br/>
((Number of Pages \* 1 day) + (Number of Features \* 2 days)) / Number of Developers

<div class="row g-0 not-prose">
  <div class="col-xl-6">
    {{< form background=`#1D1F26` style=`rounded-boxed` conditional-form=true >}}

      {{< input-text
        type=`number`
        label=`Number of Pages`
        id=`number-of-pages`
        name=`number-of-pages`
        condition=`calc/add:project-duration` >}}
      {{< input-text
        type=`number`
        label=`Number of Features`
        id=`number-of-features`
        name=`number-of-features`
        condition=`calc/add:project-duration` >}}
      {{< input-text
        type=`number`
        label=`Number of Developers`
        id=`number-of-developers`
        name=`number-of-developers`
        value=`1`
        min=`1`
        condition=`calc/add:project-duration` >}}

      {{< input-calc-result title=`Total Duration` append=`Day` prepend=`` id=`project-duration` formula=`(({number-of-pages}*1)+({number-of-features}*2))/{number-of-developers}` conditional-element=true  >}}

      {{< button-submit value=`Submit` >}}
    {{< /form >}}
  </div>
</div>

<br/>
<br/>
<br/>
