import blogOrthopedic from "@/assets/blog-orthopedic.jpg";
import blogCardiac from "@/assets/blog-cardiac.jpg";
import blogSurgery from "@/assets/blog-surgery.jpg";
import blogFallPrevention from "@/assets/blog-fall-prevention.jpg";
import blogDementia from "@/assets/blog-dementia.jpg";
import blogFutureHealthcare from "@/assets/blog-future-healthcare.jpg";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  authorAvatar: string;
  category: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "orthopedic-recovery",
    title: "A Compassionate Guide to Orthopedic Recovery at Home",
    excerpt: "Recovering from an orthopedic injury or surgery presents unique challenges that extend far beyond the hospital stay. Proper guidance makes all the difference.",
    content: `<p>Recovering from an orthopedic injury or surgery presents unique challenges that extend far beyond the hospital stay. The journey to full recovery requires patience, proper care, and a supportive environment — and that's exactly what home-based care provides.</p>

<h2>Understanding Your Recovery Timeline</h2>
<p>Every orthopedic recovery is unique, but most follow a general timeline. The first two weeks are critical for wound healing and managing pain. Weeks three through six focus on gradually increasing mobility, while months two through six involve building strength and returning to normal activities.</p>

<h2>Essential Home Care Tips</h2>
<p>Creating a safe recovery environment at home is crucial. Remove tripping hazards, install grab bars in bathrooms, and ensure frequently used items are within easy reach. Good nutrition plays a vital role — focus on protein-rich foods, calcium, and vitamin D to support bone healing.</p>

<h2>The Role of Physical Therapy</h2>
<p>Home-based physical therapy is often the cornerstone of orthopedic recovery. A licensed therapist can design exercises tailored to your specific injury, monitor your progress, and adjust your treatment plan as needed. Consistency with prescribed exercises is key to a successful outcome.</p>

<h2>When to Seek Additional Help</h2>
<p>Watch for signs of complications such as increased swelling, fever, unusual pain, or drainage from surgical sites. Don't hesitate to contact your healthcare provider if something doesn't feel right. Early intervention can prevent minor issues from becoming serious problems.</p>

<p>At Midway Health, our team of skilled nurses and therapists specialize in orthopedic home care. We work closely with your surgeon to ensure a seamless transition from hospital to home, providing the expert care you need for a full recovery.</p>`,
    image: blogOrthopedic,
    date: "Feb 5, 2026",
    author: "Dr. Sarah Mitchell",
    authorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    category: "Recovery",
    readTime: "6 min read",
  },
  {
    slug: "post-cardiac-surgery-care",
    title: "Comprehensive Post Cardiac Surgery Care: Recovery, Rehab & Home Support",
    excerpt: "We provide trusted post cardiac surgery care designed to ensure a safe, smooth, and successful recovery journey.",
    content: `<p>Heart surgery is a life-changing event, and the recovery period that follows is just as important as the procedure itself. With the right support at home, patients can achieve better outcomes and return to their daily lives with confidence.</p>

<h2>The First Few Weeks After Surgery</h2>
<p>The initial recovery period focuses on wound care, pain management, and gradually increasing activity levels. Our skilled nurses monitor vital signs, manage medications, and watch for signs of infection or complications. Rest is essential, but so is gentle movement to prevent blood clots and promote circulation.</p>

<h2>Cardiac Rehabilitation at Home</h2>
<p>Our home-based cardiac rehab programs include supervised exercise, dietary guidance, and stress management techniques. We work with your cardiologist to create a personalized plan that safely strengthens your heart and improves your overall cardiovascular health.</p>

<h2>Lifestyle Modifications for Heart Health</h2>
<p>Recovery is also about building healthier habits for the long term. This includes heart-healthy eating, smoking cessation support, stress reduction, and understanding your medications. Our team provides education and ongoing support to help you make lasting changes.</p>

<h2>Emotional Support and Mental Health</h2>
<p>It's common to experience anxiety, depression, or fear after cardiac surgery. Our caregivers are trained to recognize these challenges and provide compassionate emotional support. We can also connect you with mental health resources when needed.</p>

<p>Midway Health's cardiac care team brings hospital-level expertise into your home, ensuring you have the support you need every step of the way.</p>`,
    image: blogCardiac,
    date: "Jan 22, 2026",
    author: "Dr. James Okonkwo",
    authorAvatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
    category: "Cardiac Care",
    readTime: "7 min read",
  },
  {
    slug: "after-surgery-care",
    title: "After Surgery Care at Home: Your Complete Guide to Safe Recovery",
    excerpt: "Surgery recovery doesn't end when you leave the hospital. In fact, the most critical phase of your healing journey begins at home.",
    content: `<p>Coming home after surgery can feel both relieving and overwhelming. While you're finally in a comfortable environment, you may wonder if you're doing everything right. This guide covers the essentials of post-surgical home care to help you heal safely and effectively.</p>

<h2>Preparing Your Home Before Surgery</h2>
<p>Planning ahead makes a big difference. Stock up on easy-to-prepare meals, arrange your living space for easy navigation, and set up a comfortable recovery area with everything you need within reach. Having a plan in place reduces stress and helps you focus on healing.</p>

<h2>Wound Care Basics</h2>
<p>Proper wound care is essential to prevent infection and promote healing. Follow your surgeon's instructions carefully, keep incision sites clean and dry, and watch for signs of infection such as redness, swelling, warmth, or discharge. Our skilled nurses can handle complex wound care right in your home.</p>

<h2>Managing Pain Effectively</h2>
<p>Pain management is crucial for recovery. Take prescribed medications as directed, use ice packs or heat as recommended, and don't wait until pain becomes severe before taking medication. Communicate openly with your care team about your pain levels so adjustments can be made.</p>

<h2>Nutrition for Healing</h2>
<p>Your body needs extra nutrients to heal after surgery. Focus on lean proteins, fruits, vegetables, and whole grains. Stay well-hydrated, and consider supplements if recommended by your doctor. Avoid alcohol and limit processed foods that can impair healing.</p>

<h2>Knowing When to Call for Help</h2>
<p>Don't hesitate to reach out if you experience fever over 101°F, excessive bleeding, severe pain not relieved by medication, difficulty breathing, or signs of blood clots. Early intervention is always better than waiting.</p>

<p>At Midway Health, we make the transition from hospital to home seamless with comprehensive post-surgical care tailored to your specific needs.</p>`,
    image: blogSurgery,
    date: "Jan 10, 2026",
    author: "Nurse Patricia Williams",
    authorAvatar: "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=100&h=100&fit=crop&crop=face",
    category: "Post-Surgery",
    readTime: "8 min read",
  },
  {
    slug: "elderly-fall-prevention",
    title: "Preventing Falls at Home: Essential Safety Tips for Seniors",
    excerpt: "Falls are the leading cause of injury among older adults. Learn how simple home modifications and proper care can significantly reduce fall risk.",
    content: `<p>Falls are the leading cause of injury among older adults, but they are largely preventable. With the right home modifications, exercise routines, and support systems, seniors can maintain their independence while staying safe.</p>

<h2>Common Fall Hazards at Home</h2>
<p>Many falls happen due to preventable hazards: loose rugs, poor lighting, cluttered walkways, slippery bathroom surfaces, and unsecured cords. A thorough home safety assessment can identify and eliminate these risks before they cause injury.</p>

<h2>Exercise for Balance and Strength</h2>
<p>Regular physical activity is one of the most effective ways to prevent falls. Simple exercises focusing on balance, leg strength, and flexibility can dramatically reduce fall risk. Our physical therapists design safe, effective exercise programs tailored to each individual's abilities.</p>

<h2>Medication Review</h2>
<p>Some medications can cause dizziness, drowsiness, or low blood pressure — all of which increase fall risk. Regular medication reviews with your healthcare provider can identify potential issues and find alternatives when necessary.</p>

<h2>Assistive Devices and Technology</h2>
<p>From grab bars and walkers to medical alert systems and motion-sensor lights, there are many tools available to help prevent falls. Our occupational therapists can recommend the right devices and teach proper use to maximize safety.</p>

<p>Midway Health offers comprehensive fall prevention assessments and ongoing support to keep your loved ones safe at home.</p>`,
    image: blogFallPrevention,
    date: "Dec 28, 2025",
    author: "Dr. Sarah Mitchell",
    authorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    category: "Senior Care",
    readTime: "5 min read",
  },
  {
    slug: "dementia-caregiving-tips",
    title: "Caring for a Loved One with Dementia: Practical Tips for Families",
    excerpt: "Dementia caregiving is challenging but rewarding. Discover practical strategies to provide better care while taking care of yourself.",
    content: `<p>Caring for someone with dementia requires patience, understanding, and a willingness to adapt. While the journey can be challenging, the right strategies and support can make a meaningful difference for both the caregiver and the person receiving care.</p>

<h2>Communication Strategies</h2>
<p>As dementia progresses, communication becomes more difficult. Speak slowly and clearly, use simple sentences, maintain eye contact, and be patient. Non-verbal communication — a gentle touch, a warm smile — becomes increasingly important.</p>

<h2>Creating a Structured Routine</h2>
<p>People with dementia thrive on routine. Establish consistent times for meals, activities, and rest. A predictable schedule reduces confusion and anxiety while providing a sense of security and comfort.</p>

<h2>Managing Behavioral Changes</h2>
<p>Agitation, wandering, sundowning, and repetitive behaviors are common in dementia. Understanding triggers — such as overstimulation, pain, or unmet needs — can help prevent difficult behaviors. Redirect rather than confront, and always approach with calm reassurance.</p>

<h2>Self-Care for Caregivers</h2>
<p>Caregiver burnout is real and common. Take regular breaks, accept help from others, join a support group, and don't neglect your own health. You can't provide good care if you're running on empty.</p>

<p>Midway Health provides specialized dementia care services that support both patients and their families with compassionate, expert care.</p>`,
    image: blogDementia,
    date: "Dec 15, 2025",
    author: "Dr. James Okonkwo",
    authorAvatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
    category: "Dementia Care",
    readTime: "6 min read",
  },
  {
    slug: "benefits-of-home-healthcare",
    title: "Why Home Healthcare is the Future of Patient-Centered Care",
    excerpt: "Home healthcare offers numerous advantages over facility-based care. Discover why more patients and families are choosing care at home.",
    content: `<p>The healthcare landscape is shifting, and home healthcare is at the forefront of this transformation. More patients than ever are choosing to receive care in the comfort of their own homes — and for good reason.</p>

<h2>Better Outcomes, Lower Costs</h2>
<p>Studies consistently show that patients recover faster at home compared to institutional settings. Home healthcare also significantly reduces hospital readmissions and overall healthcare costs, making it a win-win for patients and the healthcare system.</p>

<h2>Personalized, One-on-One Care</h2>
<p>Unlike hospitals and nursing facilities where staff are spread thin, home healthcare provides dedicated, personalized attention. Your caregiver focuses entirely on you, tailoring care plans to your specific needs, preferences, and goals.</p>

<h2>Comfort and Familiarity</h2>
<p>There's no place like home. Being in a familiar environment reduces stress and anxiety, promotes better sleep, and supports emotional well-being. Patients also have more control over their daily routines and surroundings.</p>

<h2>Family Involvement</h2>
<p>Home healthcare naturally involves family members in the care process. This not only provides better support for the patient but also gives families peace of mind and the knowledge they need to assist their loved one.</p>

<h2>Technology-Enabled Care</h2>
<p>Modern home healthcare leverages technology — from telehealth visits and remote monitoring to electronic health records — to deliver sophisticated care without the need for a clinical setting.</p>

<p>At Midway Health, we're proud to be leading the home healthcare revolution with innovative, compassionate care that puts patients first.</p>`,
    image: blogFutureHealthcare,
    date: "Dec 1, 2025",
    author: "Nurse Patricia Williams",
    authorAvatar: "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=100&h=100&fit=crop&crop=face",
    category: "Home Healthcare",
    readTime: "5 min read",
  },
];
