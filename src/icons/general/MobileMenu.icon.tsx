import React from 'react';

const MobileMenuIcon = ({ iconClass }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="155"
      height="156"
      viewBox="0 0 155 156"
      className={iconClass}
    >
      <defs>
        <filter
          id="a"
          x="0"
          y="0"
          width="155"
          height="156"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="10" in="SourceAlpha" />
          <feGaussianBlur stdDeviation="15" result="b" />
          <feFlood floodOpacity="0.161" />
          <feComposite operator="in" in2="b" />
          <feComposite in="SourceGraphic" />
        </filter>
        <clipPath id="c">
          <rect width="59.99" height="58.728" fill="#fc4d16" />
        </clipPath>
      </defs>
      <g transform="translate(-102 -320)">
        <g transform="translate(-2 2)">
          <g transform="matrix(1, 0, 0, 1, 104, 318)" filter="url(#a)">
            <ellipse
              cx="32.5"
              cy="33"
              rx="32.5"
              ry="33"
              transform="translate(45 35)"
              fill="#fff"
            />
          </g>
          <g transform="translate(151.081 357.587)">
            <g transform="translate(0 0)" clipPath="url(#c)">
              <path
                d="M54.739,13.767a27.064,27.064,0,0,0-7.225-7.528A29.092,29.092,0,0,0,37.4,1.112,23.705,23.705,0,0,0,28.35.067,28.948,28.948,0,0,0,17.833,2.508a30.934,30.934,0,0,0-7.355,4.227.085.085,0,0,0-.081.014C5.3,10.827.733,15.827.114,22.636A34.25,34.25,0,0,0,.441,30.8,28.97,28.97,0,0,0,4.73,44.483c1.975,4.226,4.65,8.548,8.811,10.485,6.14,2.859,13.869,4.46,20.61,3.462a30.841,30.841,0,0,0,8.071-2.271A20.623,20.623,0,0,0,47.866,51.9a29.405,29.405,0,0,0,5.169-5.4c3.415-4.091,6.1-8.971,6.79-14.2.848-6.422-1.678-13.146-5.086-18.535m-45.889,35c3.03,2.754,6.725,4.672,10.8,6.6a27.229,27.229,0,0,0,6.127,2.063q-1.047-.13-2.092-.319A28.493,28.493,0,0,1,8.85,48.764m-7.6-28.912c.024-.088.052-.175.077-.262-.027.087-.051.175-.077.262m.166-.54a19.545,19.545,0,0,1,1.238-3.061,24.455,24.455,0,0,0-1.238,3.061M40.3,55.612C46.5,52.536,51.4,46.9,55.105,41.2c.308-.475.621-.949.93-1.425A28.66,28.66,0,0,1,40.3,55.612M56.241,38.038c-3.469,5.8-7.771,11.445-13.394,15.338S29.365,58.61,22.893,56.2C16.483,53.818,9.531,50.382,5.8,44.451c-.257-.408-.5-.828-.733-1.253A49.222,49.222,0,0,1,1.4,27.795a20.879,20.879,0,0,1-.1-2.281,28.509,28.509,0,0,1,10.9-18.9,40.984,40.984,0,0,1,9.784-4.538C27.923.2,34.87,1.679,40.48,3.87c1.514.591,3.092,1.245,4.612,2.011a31.833,31.833,0,0,1,4.533,3.553,30.3,30.3,0,0,1,3.458,3.917,40.5,40.5,0,0,1,1.965,4.28,49.981,49.981,0,0,1,2.9,8.884c.083.886.13,1.782.13,2.689a28.451,28.451,0,0,1-.838,6.852,15.124,15.124,0,0,1-1,1.981M11.269,52.618a17.872,17.872,0,0,1-2.947-3.454,29.332,29.332,0,0,0,8.044,6.04,14.089,14.089,0,0,1-5.1-2.587M57.655,37.044c.109-.213.216-.427.316-.644q-.3.919-.669,1.818c.126-.388.243-.78.353-1.174"
                transform="translate(0 0)"
                fill="#fc4d16"
              />
            </g>
          </g>
        </g>
        <path d="M0,0H29V4H0Z" transform="translate(165 376)" fill="#fc4d16" />
        <rect
          width="29"
          height="4"
          transform="translate(165 386)"
          fill="#fc4d16"
        />
        <rect
          width="29"
          height="4"
          transform="translate(165 396)"
          fill="#fc4d16"
        />
        <circle
          cx="2"
          cy="2"
          r="2"
          transform="translate(163 376)"
          fill="#fc4d16"
        />
        <circle
          cx="2"
          cy="2"
          r="2"
          transform="translate(163 386)"
          fill="#fc4d16"
        />
        <circle
          cx="2"
          cy="2"
          r="2"
          transform="translate(163 396)"
          fill="#fc4d16"
        />
        <circle
          cx="2"
          cy="2"
          r="2"
          transform="translate(192 376)"
          fill="#fc4d16"
        />
        <circle
          cx="2"
          cy="2"
          r="2"
          transform="translate(192 386)"
          fill="#fc4d16"
        />
        <circle
          cx="2"
          cy="2"
          r="2"
          transform="translate(192 396)"
          fill="#fc4d16"
        />
      </g>
    </svg>
  );
};

export default MobileMenuIcon;
