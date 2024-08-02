---
date: 2024-08-02
title: "When Updates Go Wrong: What the CrowdStrike Incident Teaches Us"
description:  The recent CrowdStrike outage highlights the risks of vendor overreliance. How can organizations build a resilient IT infrastructure? 

image: images/blog/when-updates-go-wrong-what-the-crowdstrike-incident-teaches-us/banner.png
cover_image: false
cover_image_src: 
cover_image_height: ""
cover_image_width: ""

author: shreya
series: 
categories:
- Cloud native
- Shift left
- Software supply chain security
tags:
- Cloud native
# image color code in undraw.co #FB7E44 
feedback: false
draft: false

---

{{< image src="images/blog/when-updates-go-wrong-what-the-crowdstrike-incident-teaches-us/thumbnail.gif" alt="alter-text"  class="img-fluid" caption="" webp="false" position="float-left" >}}

</br> </br>

We’ve all been there—you're working, and suddenly, your apps or tools stop working. Recently, this exact scenario played out on a massive scale with CrowdStrike and Microsoft. So, what went down, and why did it happen?   

**What Went Down: Blue Screen of Death in Windows 10**
</br> 
On Friday, July 19, 2024, a faulty Microsoft system update affected about 8.5 million devices, causing a major outage worldwide. This impacted nearly 1% of all Microsoft systems and led to massive disruptions for airlines, police departments, banks, hospitals, emergency services, and many other businesses.  

{{< image src="images/blog/when-updates-go-wrong-what-the-crowdstrike-incident-teaches-us/you-have-to-stay-calm-meme.jpg" alt="alter-text"  class="img-fluid" caption="" webp="false" position="float-left" >}}

</br> </br>

**Why Did It Happen?**  
</br>
Software updates are supposed to make things better, right? But sometimes, they introduce new issues if they’re not tested thoroughly. In this case, CrowdStrike’s update, aimed at boosting their service, ended up having a bug that caused chaos. This glitch even rippled out to affect Microsoft services relying on CrowdStrike for security.  

Recently, CrowdStrike released a new version of their Falcon Agent, which included an updated file, C-00000291*.sys. After the update was applied, Windows machines began crashing. The problem only occurred on machines that had received the update, not on those that hadn’t. 

{{< image src="images/blog/when-updates-go-wrong-what-the-crowdstrike-incident-teaches-us/bsod-workflow.jpg" alt="alter-text" class="img-fluid" caption="" webp="false" position="float-left" >}}

</br> </br>

## The Perils of Putting All Your Eggs in One Basket: Navigating Vendor Lock-in Risks    
Many organizations opt for vendor consolidation because it promises efficiency, cost savings, and streamlined operations. But the recent CrowdStrike incident shows a major downside: concentration risk.   
Relying only on one provider can create a single point of failure. If that provider encounters an issue, it can cause widespread problems for your entire organization.

IT leaders should hold vendors deeply integrated within IT systems, such as CrowdStrike, to a “very high standard” of development, release quality, and assurance, said Neil MacDonald, a Gartner vice president.   
Here’s how over-relying on a single vendor can impact a business:   

- **Disruptions:** Your operations could grind to a halt, causing delays and inefficiencies.  
- **Security Risks:** Your business becomes a bigger target for cyberattacks when defenses are down.  
- **Legal Trouble:** Companies in highly regulated industries could face fines and legal issues.  
- **Financial Loss:** Downtime and recovery efforts can be expensive.  
- **Reputation Damage:** Customers and partners may lose trust if your business is frequently disrupted.

{{< image src="images/blog/when-updates-go-wrong-what-the-crowdstrike-incident-teaches-us/vendor-lock-in-meme.jpg" alt="alter-text" class="img-fluid" caption="" webp="false" position="float-left" >}}  

## Leaders, Take Note: The Risk is Real

Outages like these are inevitable, and businesses will face disruptions from time to time. To better manage and reduce the impact of such events, senior executives need to be ready with proactive questions 

>> **What steps should we take to enhance our resiliency, and what will it cost?**   

Teams often juggle the push for new features with the need to fix technical issues and strengthen system reliability. Investing in flexible cloud systems and geo-resilient setups can help recover quickly during outages. Senior leaders should check with their tech teams about areas needing improvement and where more investment could make a real difference.  

>> **Do we have a clear picture of our risks?**  

Think about the cost if a major factory or process went down for days—do you know how it would impact your bottom line? Many companies don’t have a clear view of their risks. It’s important to know which critical apps are on reliable platforms and which are vulnerable. Also, which tech vendors could cause major disruptions if they fail? Senior leaders should push for detailed risk assessments to get ahead of potential problems.  

{{< image src="images/blog/when-updates-go-wrong-what-the-crowdstrike-incident-teaches-us/largest-it-outage-stat.jpg" alt="alter-text" class="img-fluid" caption="" webp="false" position="float-left" >}}

</br> </br>
## The Near-Miss: How CrowdStrike Outage Was a Cybersecurity Wake-Up Call  

CrowdStrike has made it clear that their recent outage wasn’t due to a security breach or cyberattack. But that doesn’t mean it didn’t leave businesses in a tough spot. The outage shook up the cybersecurity world and raised serious questions about the reliability of even the best security solutions.  
Here’s how this tech chaos could have potentially turned into a hacker’s playground:

{{< image src="images/blog/when-updates-go-wrong-what-the-crowdstrike-incident-teaches-us/security-update-cause-system-crash-meme.jpg" alt="alter-text"  class="img-fluid" caption="" webp="false" position="float-left" >}}
  
- **Deceptive Websites:** Following the CrowdStrike outage, cybercriminals created fake websites with names similar to CrowdStrike (e.g., "crowdstrikebluescreen.com"). These websites aim to trick users into downloading malware or revealing personal information.

{{< image src="images/blog/when-updates-go-wrong-what-the-crowdstrike-incident-teaches-us/crowdstrike-phishing-mails.png" alt="alter-text" class="img-fluid" caption="" webp="false" position="float-left" >}}

Source - Phishing Mails

- **Malicious Updates:** Cybercriminals also distributed ZIP files disguised as fixes for the CrowdStrike issue (e.g., "crowdstrike-hotfix.zip"). These files may have contained a program called a Remote Access Trojan (RAT). A RAT allows attackers to remotely control infected systems, potentially leading to data breaches.  

The temporary lapse in security measures could have easily invited cyber threats, showcasing the need for robust contingency plans and a diversified approach to security. This situation underscores how critical it is for organizations to prepare for and mitigate risks, even when an incident isn't directly related to cyberattacks.  

{{< image src="images/blog/when-updates-go-wrong-what-the-crowdstrike-incident-teaches-us/fake-zip-file.png" alt="alter-text" class="img-fluid" caption="" webp="false" position="float-left" >}}

Source - AnyRun

## CrowdStrike Impact: Shaping a Secure and Prepared Future 

- **Automated Testing and Quality Assurance:** Automated testing capabilities are essential for thoroughly testing code in various development and staging environments, helping identify critical issues before they reach production or end-users. Integrating strict smoke and sanity tests into all software changes, both major and minor, significantly reduces the likelihood of critical failures. This requires a combination of unit, integration, and end-to-end testing. 

- **Comprehensive Security Measures:** Continuous testing procedures act as quality assurance inspectors, ensuring new products work as intended. Similarly, robust security capabilities inspect and scrutinize the materials and development of the product during coding and in production environments. This ensures the product is built with strong security features, limiting the impact of malicious actors. 

- **Real-Time Monitoring and Rollback Mechanisms:** Implementing robust real-time monitoring and automated rollback mechanisms is crucial for quickly identifying and mitigating the impact of faulty updates. This helps prevent widespread disruptions, ensure system stability, and minimize downtime. 

## Don't Get Caught Off Guard: Preparing for the Future with Capten.ai  

In light of the CrowdStrike incident, it's time for technology leaders to revisit their software engineering processes to ensure they are resilient and adaptable. Leveraging solutions that support diverse technologies and standards can enhance security, enforce compliance, and reduce vulnerabilities. Prioritizing data privacy and customizability helps secure data and supports system growth, ensuring smooth operations and readiness for future challenges. 

This is where Capten.ai steps in helping organizations to easily integrate and adopt cloud-native technologies while fortifying their software supply chain security through proactive, "shift-left" security practices. By adhering to open standards, Capten facilitates integration of diverse technologies, preventing vendor lock-in and helping teams the flexibility to innovate without limitations. 
