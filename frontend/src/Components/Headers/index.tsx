import React, { useContext } from "react";
import Callout from "plaid-threads/Callout";
import Button from "plaid-threads/Button";
import InlineLink from "plaid-threads/InlineLink";

import Link from "../Link";
import Context from "../../Context";

import styles from "./index.module.scss";

const Header = () => {
  const {
    itemId,
    accessToken,
    linkToken,
    linkSuccess,
    isItemAccess,
    backend,
    linkTokenError,
    isPaymentInitiation,
  } = useContext(Context);

  return (
    <div className={styles.grid}>
      {!linkSuccess ? (
        <>
          <div className="front-padding">
            <div className="descriptor-text">
              A better way to budget and save for what you really care about
            </div>
            {/* message if backend is not running and there is no link token */}
            {!backend ? (
              <Callout warning>
                Unable to fetch link_token: please make sure your backend server
                is running and that your .env file has been configured with your
                <code>PLAID_CLIENT_ID</code> and <code>PLAID_SECRET</code>.
              </Callout>
            ) : /* message if backend is running and there is no link token */
            linkToken == null && backend ? (
              <Callout warning>
                <div>
                  Unable to fetch link_token: please make sure your backend
                  server is running and that your .env file has been configured
                  correctly.
                </div>
                <div>
                  If you are on a Windows machine, please ensure that you have
                  cloned the repo with{" "}
                  <InlineLink
                    href="https://github.com/plaid/quickstart#special-instructions-for-windows"
                    target="_blank"
                  >
                    symlinks turned on.
                  </InlineLink>{" "}
                  You can also try checking your{" "}
                  <InlineLink
                    href="https://dashboard.plaid.com/activity/logs"
                    target="_blank"
                  >
                    activity log
                  </InlineLink>{" "}
                  on your Plaid dashboard.
                </div>
                <div>
                  Error Code: <code>{linkTokenError.error_code}</code>
                </div>
                <div>
                  Error Type: <code>{linkTokenError.error_type}</code>{" "}
                </div>
                <div>Error Message: {linkTokenError.error_message}</div>
              </Callout>
            ) : linkToken === "" ? (
              <div className={styles.linkButton}>
                <Button large disabled>
                  Loading...
                </Button>
              </div>
            ) : (
              <div className={styles.linkButton}>
                <Link />
              </div>
            )}

            <div className="mini-description mild-bold">
              Start improving your ability to save for free.
            </div>
            <div className="mini-description">just kidding please don't</div>

            <div className="horizontal-line line-margin"></div>
            <div className="color-white">WOW</div>
            <br />
            <br />
            <div className="color-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="front-padding">
            {isPaymentInitiation ? (
              <>
                <Callout>
                  You can see information of all your payments in the{" "}
                  <InlineLink
                    href="https://dashboard.plaid.com/activity/payments"
                    target="_blank"
                  >
                    Payments Dashboard
                  </InlineLink>
                  .
                </Callout>
              </>
            ) : (
              /* If not using the payment_initiation product, show the item_id and access_token information */ <>
                
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

Header.displayName = "Header";

export default Header;
