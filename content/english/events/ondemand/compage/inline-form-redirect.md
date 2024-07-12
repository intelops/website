---
date: "2024-01-24"
title: "Inline Form Redirect"
image: "/images/events-webinars/intelops-webinar-card-image.jpg" # use 800x550 or 16:11 ratio image
event_date_location: "Jan 24, 2024 10AM CST"
description: 
weight: 02

draft: true

# # set it to true to enable popup form for registration
# show_popup_form: true # You can test this form locally, but please note that submissions will not be sent to Netlify.

# # Typically, once a user submits a form, it won't be displayed again when they revisit the page, unless they open it in a new tab or window. If you need to show the form again for testing purposes, you can set this option to true. This is particularly useful during local testing when you need to submit the form multiple times for testing purposes.
# popup_form_testing_mode: false

# # "video" | "content" | "redirect" # default is "content" (if you want to show a video after the form is submitted, set this to "video" and provide video url in the popup_form_video_url field. If you want to redirect to a different url, set this to "redirect" and provide a redirect url in the popup_form_redirect_url field)
# popup_form_success_action: "content" 
# popup_form_video_url: "https://www.youtube.com/embed/a3ICNMQW7Ok" # you can use youtube's embed url
# popup_form_redirect_url: "https://example.com/" # e.g. "/thank-you"

# add appropriate aliases value to support old url redirection to new url
aliases:  
  - '/events/upcoming/folder-1/example-webinar-02/' # old relative url
  - '/events/ondemand/folder-1/example-webinar-02/' # new relative url

hide_post_meta: true # hide post meta like last update & publish data, estimated reading time etc.

bannerarea: true
bannertext_color: "#fff"
bannerimage: images/banner/mindmaps-page/intelops-webinar-03.svg
---

<div class="row gx-lg-5">
    <div class="col-lg-7">
With evolving technology landscape, growth is synonymous with new and innovative solutions. Our webinar, specifically designed for technology and business leaders in regulatory industries, addresses this head-on. We are focusing on the intersection of Generative AI, agnostic frameworks and compliance, and secure innovation.

- **Simplifying Modern Technology Integration:** Learn to integrate modern tech seamlessly, overcoming obstacles and using agnostic frameworks to enhance your tech stack efficiently and compliantly.

- **Generative AI:** Power and Security: Discover Generative AI's impact on business and gain insights on its unique challenges.

- **Secure Programming and System Defense Best Practices:** Dive into essential secure programming practices and why we need strong defenses against threats, ensuring system security under regulatory compliance.

We'also unveiled Compage, our universal language framework, that standardizes development, streamlines integration, enables Generative AI adoption, and bolsters security.  

Download your on-demand recording today!

### Speaker Details

<image src="/images/avatar/chandrakanth-paladugu.jpg">

**Chandrakanth Paladugu - Founder of Capten.AI**

Chandrakanth Paladugu is a skilled architect with a deep passion for problem-solving in various technical domains, including Cloud-Native, DevSecOps, Software Supply Chain Security, and Kubernetes. His expertise lies in leveraging extensive knowledge to democratize technology and empower engineering teams with agnostic open framework models.
</div>

<div class="col-lg-5">
{{< event-form event_form_testing_mode="false" event_form_video_url="https://www.youtube.com/embed/a3ICNMQW7Ok" event_form_redirect_url="https://example.com" event_form_success_action="redirect">}}
</div>
</div>
