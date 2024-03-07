import { useNavigate } from 'react-router-dom'
import privacy_img from '../assets/images/privacy/privacy_img.png'
import Layout from '../components/common/Layout'
import { scrollToTop } from '../constants/auth_actions'

const PrivacyPolicy = () => {
  const history = useNavigate()
  const access_token = localStorage.getItem('access_token')

  return (
    <Layout>
      <div className="w-full text-white bg-[#2D7FE0] shadow-md py-6 flex flex-col gap-2">
        <p className="font-semibold text-3xl md:text-5xl text-center">
          Privacy Policy
        </p>
        <p className="font-medium text-center">Last Updated October, 2023</p>
      </div>

      <div className="flex flex-col lg:flex-row justify-evenly items-center w-full px-5 md:px-7 lg:px-28 mt-[1rem]">
        <img src={privacy_img} alt="" />

        <div className="hidden lg:inline-block border-l-2 h-96 border-gray-500"></div>

        <div className="lg:ml-[2rem]">
          <p className="text-xl md:text-2xl mb-[1rem] mt-[1.5rem] lg:mt-0 font-medium">
            THE COVERAGE OF THIS POLICY
          </p>
          <p className="text-base lg:text-sm xl:text-base">
            Welcome to Andromedia, the online and powerful mobile and web app
            (available in Web, Android & iOS) designed for website
            visitors&apos; communication. Our Privacy Policy explains how
            Andromedia and its affiliates collect, use, disclose, and protect
            information that applies to our sales management platform and your
            choices about collecting and using your information. Terms that are
            not defined in this Privacy Policy have the meaning given to them in
            our Terms of Use. If you do not want your information processed in
            accordance with this Privacy Policy in general or any part of it,
            you should not use our Service. This policy applies to all users of
            the Service.
          </p>
        </div>
      </div>

      <div className="px-5 md:px-7 lg:px-28 my-[2rem]">
        <div className="mt-[1rem]">
          <p className="text-xl md:text-2xl mb-[0.5rem] font-medium">
            INFORMATION WE COLLECT AND RECEIVE
          </p>
          <p className="text-base lg:text-sm xl:text-base">
            We may ask for certain information when you register for an
            Andromedia account or correspond with us (such as a username, your
            first and last names, birthdate, phone number, profession, and
            e-mail address). We also collect any messages you send us through
            the Service (such as user feedback, search queries and prompts), and
            may collect information you provide in the cause of using our
            service. We use this information to operate, maintain, and provide
            the features and functionality of the Service to you, to correspond
            with you, and to address any issues you raise about the Service. If
            you don’t provide your personal information to us, you may not be
            able to access or use our Service or your experience of using our
            Service may not be as enjoyable.
          </p>
        </div>

        <div className="mt-[1.5rem]">
          <p className="text-xl md:text-2xl mb-[0.5rem] font-medium">
            LOCATION DATA
          </p>
          <p className="text-base lg:text-sm xl:text-base">
            When you give us consent or enable geolocation on your device, we
            will collect the latitude and longitude coordinates of your device
            when you are searching or navigating through our websites. We use
            this information to help us improve the relevance of search results
            and make our services seamless. This information is only collected
            while the app is running. If you would like to revoke your consent
            for location tracking, please{' '}
            <span
              onClick={() => {
                scrollToTop()
                history('/contact')
              }}
              className="cursor-pointer text-[#2D7FE0]"
            >
              get in touch
            </span>
            . We also may use general geographic data inferred from your IP
            address to identify the city/State a user is operating from in order
            to personalize your experience.
          </p>
        </div>

        <div className="mt-[1.5rem]">
          <p className="text-xl md:text-2xl mb-[0.5rem] font-medium">
            COOKIES AND SIMILAR TECHNOLOGIES
          </p>
          <p className="text-base lg:text-sm xl:text-base">
            {`We also collect information through Cookies and Similar
              Technologies when you use our services or access online content. A
              "Cookie" is a small amount of data that a website transfers to
              your computer. We place Cookies when you visit our website or
              another company's website where our ads appear or when you make a
              request or personalize information. If you accept the Cookies used
              on our website, websites that are "powered by" another company on
              our behalf, or websites where our ads appear, you may give us
              access to information about your interests. We use that
              information to personalize your experience. "Similar Technologies"
              include clear GIFs, web beacons, and pixel tags, which are
              typically transparent images on websites. Cookies and Similar
              Technologies may also help Andromedia or its service providers
              collect information about your device, operating system and web
              browser, as well as your use of the device, as described in more
              detail below.`}
          </p>
          <div className="my-[1rem] flex flex-col gap-2">
            <p className="text-lg md:text-xl font-medium">
              The information we collect using Cookies and Similar Technologies
              may also include information about:
            </p>

            <ul className="list-roman ml-5 md:ml-7">
              <li className="mt-[0.5rem]">
                The device(s) you use (for example, the operating system or type
                of device you use to open electronic communications from us);
              </li>
              <li className="mt-[0.5rem]">
                Information about your IP Address (for example, domain
                information, internet provider information and general
                geographic location);
              </li>
              <li className="mt-[0.5rem]">
                How you use our websites and apps, such as what you search for
                on our websites and apps, the pages you view, how long you stay
                and how often you visit them;
              </li>
              <li className="mt-[0.5rem]">
                How you search for our websites or apps, which website or app
                you came from, and sometimes, whether you have visited a website
                of one of our business or commercial partners;
              </li>
              <li className="mt-[0.5rem]">
                Which ads or online content from us and our business or
                commercial partners you view, access or click on; and
              </li>
              <li className="mt-[0.5rem]">
                Whether you open our electronic communications and which
                sections you click on (for example, how many times you open an
                email from us).
              </li>
            </ul>

            <p className="mt-[1rem]">
              If you use your mobile device to access our products or services,
              we may collect information about your mobile device (for example,
              we collect location information to provide location-based content
              you request).
            </p>
          </div>
        </div>

        <div className="mt-[1.5rem]">
          <p className="text-xl md:text-2xl mb-[0.5rem] font-medium">
            THIRD PARTY SERVICES
          </p>
          <p className="text-base lg:text-sm xl:text-base">
            A Customer can choose to permit or restrict Third-Party Services for
            its Workspace. Typically, Third-Party Services are software that
            integrate with our Services, and a Customer can permit its
            Authorized Users to enable and disable these integrations for its
            Workspace. Andromedia may also develop and offer Andromedia
            applications that connect the Services with a Third-Party Service.
            Once enabled, the provider of a Third-Party Service may share
            certain information with Andromedia. For example, if a cloud storage
            application is enabled to permit files to be imported to a
            Workspace, we may receive the user name and email address of
            Authorized Users, along with additional information that the
            application has elected to make available to Andromedia to
            facilitate the integration. Authorized Users should check the
            privacy settings and notices in these Third-Party Services to
            understand what data may be disclosed to Andromedia. When a
            Third-Party Service is enabled, Andromedia is authorized to connect
            and access Other Information made available to Slack in accordance
            with our agreement with the Third-Party Provider and any
            permission(s) granted by Customer (including, by its Authorized
            User(s)). We do not, however, receive or store passwords for any of
            these Third-Party Services when connecting them to the Services.
          </p>
        </div>

        <div className="mt-[1.5rem]">
          <p className="text-xl md:text-2xl mb-[0.5rem] font-medium">
            USE OF INFORMATION
          </p>
          <p className="text-base lg:text-sm xl:text-base">
            We use information about you either on its own or combined with
            other information and in accordance with applicable law: (i) where
            it is necessary to administer our contractual relationship with you;
            (ii) for our own business interests to provide you with better
            products and services; (iii) where we have obtained your consent,
            such as for certain marketing purposes; or (iv) for compliance with
            applicable laws.
            <br />
            <br />
            More specifically, we may use information about you:
            <br />
            <br />
          </p>
          <div className="">
            <p>
              For administering our contractual relationship with you and
              delivering you our products and services, including, for instance,
              to:
            </p>
            <ul className="list-roman ml-5 md:ml-7">
              <li className="mt-[0.5rem]">
                To give you notifications and alerts to keep you updated on all
                your sales and business activities manage your account;
              </li>
              <li className="mt-[0.5rem]">
                Update you about new features and benefits;
              </li>
              <li className="mt-[0.5rem]">
                Provide location-based services you may request; and
              </li>
              <li className="mt-[0.5rem]">Better communicate with you.</li>
            </ul>
          </div>

          <p>
            <br />
            <br />
            For our business interests or for the business interests of our
            partners, or as permitted by applicable law, we may use information
            about you to:
            <br />
            <br />
            conduct research and analysis to better understand our online
            visitors, customers and our business, including to:
            <br />
            <br />
            request feedback or reviews about our products and services and
            those of our commercial and business partners; <br />
            <br /> determine the effectiveness of our advertising and marketing
            campaigns;
            <br />
            <br /> improve our websites or apps and make them easier to use;
            <br />
            <br /> place you in groups with similar customers to make
            predictions about you, deliver more personalized services and help
            determine whether you may be interested in new products or services.
            <br />
            <br /> manage our business risks, such as fraud and security risks,
            including to:
            <br />
            <br /> detect and prevent fraud or criminal activity and safeguard
            your account, including by using the location and other technical
            attributes of your mobile device or browser; and
            <br />
            <br /> advertise and market our products and services and those of
            our business and commercial partners, including to present content
            that is tailored to your interests, including targeted advertising
            across and with your consent, to: promote our products and services;
            <br />
            <br /> send you ads, promotions, and offers about products and
            services. To comply with applicable laws and regulations around the
            world, we may use information about you:
            <br />
            <br />
            to establish, exercise, or defend legal rights or claims and assist
            in dispute resolution; or as required or permitted by law.
          </p>
        </div>

        <div className="mt-[1.5rem]">
          <p className="text-xl md:text-2xl mb-[0.5rem] font-medium">
            HOW WE SHARE YOUR INFORMATION
          </p>
          <p className="text-base lg:text-sm xl:text-base">
            We may share your information with third-party service providers for
            the purpose of providing the Service to you, to facilitate
            Andromedia&apos;s legitimate interests if you consent. These service
            providers are vetted by us, and will only be provided with access to
            your information as is reasonably necessary for the purpose that
            Andromedia has engaged the service provider. We require that such
            third parties comply with applicable laws, and have security,
            privacy, and data retention policies consistent with our policies.
            <br />
            <br />
          </p>
          <div>
            <p>
              Some of the third parties with whom Andromedia may share your
              personal information are service providers who assist Andromedia
              with functions such as:
              <br />
              <br />
            </p>

            <ul className="list-roman ml-5 md:ml-7">
              <li className="mt-[0.5rem]">Billing;</li>
              <li className="mt-[0.5rem]">
                Customer support and customer management;
              </li>
              <li className="mt-[0.5rem]">Email services;</li>
              <li className="mt-[0.5rem]">Hosting and storage;</li>
              <li className="mt-[0.5rem]">
                Data analytics and predictive analytics;
              </li>
              <li className="mt-[0.5rem]">
                Data labeling and machine learning;
              </li>
              <li className="mt-[0.5rem]">Security;</li>
              <li className="mt-[0.5rem]">
                Advertising and marketing services;
              </li>
              <li className="mt-[0.5rem]">Domain name registration;</li>
            </ul>
          </div>
        </div>

        <div className="mt-[1.5rem]">
          <p className="text-xl md:text-2xl mb-[0.5rem] font-medium">
            SECURITY
          </p>
          <p className="text-base lg:text-sm xl:text-base">
            We use administrative, organizational, technical, and physical
            security measures to protect the confidentiality, integrity, and
            availability of personal information. Here&apos;s what you should
            know: these measures include technological safeguards and
            appropriate access controls to data and facilities; we require
            service providers to safeguard personal information and only use it
            for the purposes we specify; we take reasonable steps to securely
            destroy or de-identify personal information when we no longer need
            it.
            <br />
            <br />
            We keep personal Information as long as necessary to provide you
            with products or services unless we are required or permitted to
            keep it for longer by law, regulation, or for the purposes of
            litigation or regulatory investigations.
          </p>
        </div>

        <div className="mt-[1.5rem]">
          <p className="text-xl md:text-2xl mb-[0.5rem] font-medium">CHOICES</p>
          <p className="text-base lg:text-sm xl:text-base">
            {`Where you provide us with consent to do so, we may use the account
              information and contact information described in the "Information
              We Collect" section to send you marketing and advertisements,
              including curated recommendations about ways to modify sales,
              improve sales, or any other necessary information. You have
              choices about how Andromedia uses personal information about you
              for marketing and advertising. The choices available to you may
              differ depending on whether we are communicating with you through
              a website, email, app, or social media. We will always respect the
              choices you make.`}
          </p>
        </div>

        <div className="mt-[1.5rem]">
          <p className="text-xl md:text-2xl mb-[0.5rem] font-medium">
            CONTACT US
          </p>
          <p className="text-base lg:text-sm xl:text-base">
            If you have questions about this Privacy Policy, or for information
            about the way we or our service providers treat personal
            information, please{' '}
            <span
              onClick={() => {
                scrollToTop()
                history('/contact')
              }}
              className="cursor-pointer text-[#2D7FE0]"
            >
              contact us
            </span>
            . If you are a customer and would like to update your personal
            information, you can log in to your{' '}
            <span
              onClick={() => {
                scrollToTop()
                if (access_token) {
                  history('/dashboard')
                } else {
                  history('/signin')
                }
              }}
              className="cursor-pointer text-[#2D7FE0]"
            >
              account
            </span>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default PrivacyPolicy
