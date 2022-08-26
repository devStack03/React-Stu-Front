import React from "react";
import {
  Accordion,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import powerPortfolio from "../../assets/img/portfolio.png";
import EditDomain from "../../assets/img/edit-domain.png";
import PitchVideo from "../../assets/img/pitch-video.png";
import Fade from "react-awesome-reveal";


const HowItWorks = (props) => {
  return (
    <>
      <Container>
        <Row className="common-styling">
          <Col xs="12" className="mb-4">
            <Fade direction="up">

              <h1 className="how-works">How it works</h1>
            </Fade>
            <Fade direction="up">

              <p>
                We breed domain names and want all of them to have GIANT SUCCESS.
                Stud is built to help you turn your passion into a business. Stud
                will not only empower internet entrepreneurs we will also show
                domain investors how to get top dollars for their prime Domain
                Names by “Breeding” them not just selling them.
              </p>
            </Fade>
          </Col>
          <Col xs="12">
            <div className="how-it-works-card">
              <Fade direction="up">
                <h2 className="breed">We Breed Domain Names</h2>
              </Fade>
              <Fade direction="up">
                <p>
                  Commission will be a flat and easy 10%. All fees will be split
                  50/50 between buyer and seller unless negotiated differently.
                  There will be ZERO TOLERANCE for trademark violations. ONE
                  WARNING ONLY! All domains under $10,000 MUST have a BIN price.
                  There will be NO "Make an offer" on Stud.com for domains ITS
                  WEAK and DESPERATE!!!!
                </p>
                <p>
                  It says, "I will pull my pants down because I am desperate"
                  Portfolios and Domains must be approved. And we are not the
                  platform to dump 10,000 or 100,000 names into. We want only your
                  finest names. Stud is the platform you should always look for
                  the Bigger Better Deals. We want you to use our tools to rise
                  and repeat your success system to the top of the domain ladder.
                </p>
              </Fade>
            </div>
          </Col>
          <Col xs="12" className="mt-4">
            <div className="how-it-works-card">
              <Fade direction="up">

                <h2 className="breed">Finding great opportunity </h2>
              </Fade>
              <Fade direction="up">

                <h3>
                  Opportunities to make deals, meet new folks and grow your
                  business
                </h3>
              </Fade>
              <Fade direction="up">

                <p>
                  Every step of your online business on our platform will help you
                  find the best of the business. We are the Gold Standard domain
                  brokerage, marketplace, and freelance platform that's going to
                  blow the doors of the industry. We have the TOOLS to RULE!
                </p>
              </Fade>
            </div>
          </Col>
          <Col xs="12" className="mt-4">
            <div className="how-it-works-card pb-5">
              <Fade direction="up">

                <h2 className="breed" style={{ color: "white" }}> WHAT ARE THE TOOLS? </h2>
              </Fade>
              <Fade direction="up">

                <p>
                  Words can't truly convey how game-changing tools will change our
                  members lives. Our GOAL is always to generate the best results
                  for every level of members. Nothing is more rewarding than
                  seeing lives change on Stud with the TOOLS TO RULE.
                </p>
              </Fade>

              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Portfolio Power - Actions</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Power Portfolio page is used to manage all your domain
                      portfolios in one place. Tap the orange Actions setting on
                      the top right to edit your domains
                    </p>
                    <Image className="mb-4" src={powerPortfolio}></Image>
                    <p>
                      You can choose the <strong>Business Status</strong> for
                      your <strong>Landing pages.</strong> <br></br>
                      <strong>
                        Trade Options - 3 Figure -4 Figure - 5 Figure
                      </strong>
                      trade deals to search for the business.<br></br>
                      <strong>Startup Breeders -</strong> Pitch to Us to create
                      development opportunities in the domain. <br></br>
                      <strong>Domain Den, Domain Search </strong> will show your
                      listed domains so other members to find them for business.
                      <br></br>
                      All inquiries from members will be sent an inquiry to
                      accept or decline. Once you have updated these settings it
                      will automatically show your business options.
                    </p>
                    <Image className="mb-4" src={EditDomain}></Image>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Startup Breeders</Accordion.Header>
                  <Accordion.Body>
                    <h2>Pitch to Us</h2>
                    <p>
                      Do you have a special talent? Maybe lucky for you the
                      owner of the domain could be looking for you to pitch your
                      talent as they are open for business. Our members can
                      create an opportunity with the power of passion and great
                      ideas to work on your DREAM DOMAIN. Maybe you don’t have
                      the money to make money in domains! You might have some
                      talent that is so priceless that a domain owner might be
                      interested in working with you.
                    </p>
                    <p>
                      Yes, it will be harder to get the deal! You will hit more
                      walls, but you would be amazed at what you can accomplish
                      when your back is up against the wall. The opportunity you
                      can create. The fire you can make with SHEER WILL! Winners
                      always find a way. They have inner strength and have
                      learnt that from hard life experiences they can use those
                      skills to BUILD YOUR DREAM
                    </p>
                    <h3 style={{ textAlign: "left" }}>
                      Pitch to Us to create the opportunity
                    </h3>

                    <p>
                      Always do your very best when you use the Pitch to Us to
                      create the opportunity. Sometimes in life, you don't get a
                      second chance so please don't waste your opportunity.
                      Words are very powerful and they can make or break you.
                      You have to have a plan. You have to be smart, open your
                      mind to the creative magic to give you the fuel to
                      breakthrough when you pitch for your opportunity.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    Exclusive Startup Breeders
                  </Accordion.Header>
                  <Accordion.Body>
                    <h2>Pitch to Us</h2>
                    <p>
                      Exclusive Startup Breeders is for high-caliber
                      individuals. Only hand-picked talented members can pitch
                      their ideas, they need to showcase their perfect business
                      plan and what they have to offer to connect using the
                      <strong>Riches get the Pitches</strong> to get introduced
                      to the
                      <strong> Thoroughbred Premium domain</strong> owners.
                    </p>
                    <p>
                      We are true pioneers specializing to find the ideal
                      matches for our
                      <strong> Thoroughbred Premium domain</strong> owners.
                    </p>
                    <h3 className="mt-4" style={{ color: "white" }}>
                      What do you have to offer?
                    </h3>

                    <p>
                      Our development team only work on Exclusive Startup
                      Breeders projects they believe could be the next big
                      thing. We assemble highly skilled professionals that are
                      the most suitable for the selected project and they will
                      help organize your business for the best chance to become
                      successful with a devoted team to make extraordinary
                      things happen to achieve your goals. Innovation is in our
                      DNA! We build the streams to get the Big Deals.
                    </p>
                    <h3>Golden Ticket -Thoroughbreds Domains</h3>
                    <p>
                      Do you have domains people would CLIMB over MOUNTAINS and
                      walk over HOT COALS to own? Fortunately for you they might
                      have the chance to get a GOLDEN TICKET and have those
                      domains listed in our Thoroughbred Domains section to
                      prove it is the HIGHEST QUALITY like the RAREST DIAMONDS.
                    </p>
                    <h3>Great domain names jump off the page</h3>
                    <p>
                      Thoroughbred domains are like a GUIDING LIGHT! They are
                      SUPERIOR, they are one of the KEY ingredients so your
                      business model could NEVER be duplicated. They are the
                      Magic Carpet that can make your dream come true built on
                      the internet CITY of locations and can help secure your
                      place as an industry leader. Thoroughbred domains are like
                      fine wines, the longer you hold them, the better they get.
                      It is an appreciating asset when you buy right and buy the
                      right domain. An appreciating asset that can be expanded
                      on, built on and developed. Done on your timetable at the
                      right time as things unfold in reality and are not
                      calendar-based.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Video Pitch Idea</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      We think that doing things like 'Shark Tank' will add a
                      new dimension and excitement to give domain owners the
                      chance to be the Judge to find the winning candidate with
                      the Video Pitch Idea to negotiate the best deal for the
                      members.
                    </p>
                    <p>
                      Words can change lives, combined with a VIDEO pitch that
                      might allow you to work on your DREAM DOMAIN so the domain
                      owner can visually see your passion, great ideas and
                      business plan.
                    </p>
                    <p>
                      People that have BIG IDEAS will end up here and GIANT
                      deals will be done. Stud.com started from a video pitch.
                      It's a piece of magic the domain industry was missing.
                      It's going to be on every landing page and members can
                      also upload a personal video about their business on their
                      My Profile page.
                    </p>
                    <p>
                      Papers are great, of course… And you need them to write
                      everything important for investors. But VIDEO is the most
                      direct way of communication, allowing you to convince the
                      investors in a few minutes or even seconds.
                    </p>
                    <h3> Power of Pitching a Video</h3>
                    <p>
                      It helps you bring your pitch to life. You can dynamically
                      share your passion and story, which is important because
                      emotional connection is vital for your video Pitch.
                    </p>
                    <Image className="mb-4" src={PitchVideo}></Image>
                    <p>
                      Through video, you can create a personal connection with
                      our members to do business:
                    </p>
                    <ListGroup className="my-4">
                      <ListGroup.Item>
                        Grab the audiences attention
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Convince them to partner with you
                      </ListGroup.Item>
                      <ListGroup.Item>Share valuable Insights</ListGroup.Item>
                      <ListGroup.Item>
                        Create a powerful story and express your skills
                      </ListGroup.Item>
                    </ListGroup>
                    <p>
                      Above all, it has a human element, which is the main
                      source of the ingredient. This helps members feel more
                      connected to you even if you are physically not present at
                      the moment.
                    </p>
                    <p>
                      <strong>And it works for all types of businesses…</strong>
                    </p>
                    <p>
                      Nowadays, businesses are busier than ever, and cold emails
                      aren’t working as they used to. The best way to convince a
                      business to partner with you is to make them fall for your
                      story.
                    </p>
                    <h3 className="mt-4" style={{ textAlign: "left" }}>
                      Never be scared to chase your dream. Graveyards are full
                      of perfect that never made it!
                    </h3>
                    <p>
                      A good pitch isn’t meant to answer everything.<br></br>
                      It probably has parts of your white paper. But what’s more
                      important is that it demonstrates the strength of your
                      idea.<br></br>
                      Consider you have a development team or have lots of
                      skills that could make a business successful. So, why not
                      create a video and pitch someone to partner with you?
                      <br></br>
                      By the end of the pitch, your partner will have a better
                      idea about you, who you are as an entrepreneur, and what
                      is your main goal. All in all, using a video pitch will
                      help stand out from the rest and have a long-lasting
                      impression.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>Domain Den</Accordion.Header>
                  <Accordion.Body>
                    <h3 className="mt-4" style={{ textAlign: "left" }}>
                      Atmosphere of Opportunity
                    </h3>
                    <p>
                      Domain Den is a LIFE-CHANGING online DOMAIN DEAL BUSINESS
                      tool. It's designed to accelerate business and help
                      generate lots of DEALS to grow your WHOLE DOMAIN EMPIRE.
                      We engineered the formula to give you lots of
                      opportunities to find GEM DOMAIN DEALS to build your way
                      up the ladder and become successful.
                    </p>
                    <h2 className="mt-4" style={{ color: "white" }}>
                      HUNT FOR DOMAIN TREASURES
                    </h2>
                    <p>
                      It's going to change the WHOLE INDUSTRY while you are
                      searching for domains you'll have lots of different
                      options to SEAL THE DEAL. Every domain shows the type of
                      business they are looking for on the Domain Den.
                    </p>
                    <h3 className="mt-4">
                      The harder you work, the luckier you get!
                    </h3>
                    <p>
                      All the latest Sponsored headline deals will appear on the
                      Home Page and Domain Den giving you lots of opportunities
                      to find those Gem Domain Deals while you keep searching
                      using this tool. Every time you click on a possible match
                      the members will get a message in their inbox to view the
                      interested members My profile page to view their business
                      opportunities. Both users can choose when to ignore or
                      consider messages.
                    </p>
                    <h2 className="mt-4" style={{ color: "white" }}>
                      YOU SNOOZE, YOU LOSE!
                    </h2>
                    <p>
                      The early bird gets the worm! Domain Den is a
                      game-changer, a life changer it's designed to help promote
                      domain business! Once you master this tool you will
                      realize how valuable it is to help you SPOT the best
                      deals. ANYONE can do this and do it well IF you point
                      yourself in the right direction. There are an INFINITE
                      amount of .com domains. It will NEVER run out. It's the
                      perfect tool to find hidden treasures and it will give you
                      the FUEL you need to get to the next level.
                    </p>
                    <h3 className="mt-4">
                      Learn the skills, to get the GIANT deals
                    </h3>
                    <p>
                      The secret is taking that one success and multiplying it.
                      Just remember during that Trickle of business, a GIANT
                      ELEPHANT may magically appear! There are so many different
                      ways to climb the Domain Mountain and make your fortune.
                      Especially since there are PLENTY of .com domains of great
                      value for BARGAIN prices! Ride the trends, to build fast!
                      Be early on trends and catch the wave.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header>Sponsored Headlines</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Sponsored headline domains will be shown on Stud.com home
                      page and our entire advertising network. This helps the
                      domain sellers to promote, enhance their visibility and
                      drive better conversions.
                    </p>
                    <p>
                      Sponsored headlines will help in a Bidding War when an
                      inquiry is made on your domain making a huge influence on
                      the prevailing success of the deal. Once the selected
                      sponsored domain headline is ordered, it will be
                      immediately uploaded to the websites home page.
                    </p>
                    <h3 className="mt-4" style={{ textAlign: "left" }}>
                      Sponsored domain headlines has three listing options.
                    </h3>
                    <h2
                      className="mt-4 breed"
                      style={{ color: "white", textAlign: "left" }}
                    >
                      PRICING
                    </h2>
                    <ListGroup as="ol" numbered>
                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">BUY NOW - BIN PRICE</div>
                          $5 per listing
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">TRADE DOMAIN OPTIONS</div>
                          $3 per listing
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">STARTUP BREEDERS</div>
                          $10 per listing
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                    <p className="mt-4">
                      Once the expected numbers of listed domains are achieved
                      on sponsored headlines homepage, they will be uploaded in
                      the form of a file containing the list. This file is also
                      uploaded to our entire advertisement network.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="6">
                  <Accordion.Header>
                    Trade Domain Name -
                    <span style={{ color: "white" }}> Options</span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Trading domains is a great method for finding valuable
                      domain names and you can profit from smaller deals via our
                      trading tools at a faster pace to build your portfolio of
                      Gems! The <strong>Domain Den</strong> tool and the main
                      <strong> Domain Search</strong> will gave you a great
                      chance to find some <strong>hidden treasures</strong> to
                      trade domains with other members. You have three different
                      categories of domain trade options.
                    </p>
                    <Image src={EditDomain} />
                    <p className="mt-4">
                      Members will edit the setting for the domain trade figure
                      of each domain on the Power Portfolio page on the
                      <strong style={{ color: "white" }}>
                        Orange Active
                      </strong>
                      setting on the top right. <br></br> The market is
                      excellent and keeps the traders in the domaining zone. It
                      helps them build confidence when they get inquiries for
                      the bigger deals. <br></br> Domain trading on our platform
                      can be at a fast pace. That's why it’s important to stay
                      active if you want to get the best domain trading deals to
                      initiate better profitability.
                    </p>
                    <p>
                      Once a member finds a perfect domain to trade they will
                      hit the
                      <strong style={{ color: "white" }}>

                        orange trade
                      </strong>
                      domain option. They will get a message in their inbox to
                      view the interested members <strong>
                        My Profile
                      </strong>
                      page to view their business opportunities. Both users can
                      choose when to ignore or consider messages.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="7">
                  <Accordion.Header>Negotiation Options</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      The negotiation option tools has given the power to the
                      Domainers, so they don't become weak and throw in the
                      towel. You have lots of options to extract the best deals
                      and true value for the domain with our TOOLS TO RULE. This
                      tool puts domain owners in the driving seat and controls
                      their destiny.
                    </p>
                    <p>
                      The motive is to provide a Great deal for both the buyer and seller. Domainers should never leave fortunes on the table and be impatient. Play the game the right way and your inventory will be intact and your wallet will be a lot fatter! We are NEVER DESPERATE for deals.
                    </p>
                    <h3>Best Options Towards Negotiation</h3>
                    <p>There are 4 different options to negotiate with the domain buyer for the best possible outcome.</p>
                    <h4>COUNTER OFFER</h4>
                    <p>In this option, the seller can self-brokerage for closing deals. There will be no "<strong>Make an offer</strong>" on Domains under $10,000 that have a BIN price.</p>
                    <h4>ASSIGN BROKER</h4>
                    <p>Assigning a domain broker is an extremely important decision. You must have a knowledgeable person with years of experience. Seasoned negotiators engage with the buyers in a personal way and do everything possible to get the best deal for both parties. However, this option can only be available for deals above $50,000, negotiations below need to be self-brokered our brokers only deal with seriously interested inquiries of professionals to close deals.</p>
                    <h4>BIDDERS WAR</h4>
                    <p>The domain seller has this option to use to speed up negotiations. This informs the buyer and previous bidders the domain will be on the Sponsored headlines, Studs home page and our entire advertising network to give it maximum opportunity to get the best deal before it's off the market</p>
                    <h4>STARTUP BREEDERS</h4>
                    <p>Do you have a special talent? Maybe lucky for you the owner of the premium domain could be looking for you to pitch your talent as they are open for business. Our members can create an opportunity with the power of passion and great ideas to work on your DREAM DOMAINS.</p>
                    <p>The interested member would create a business plan to connect with the premium domain owner and their maximum budget. Only budget inquiries over $10,000 will be answered.</p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default HowItWorks;
