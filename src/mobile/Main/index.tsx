"use client"
import { Icon } from '@/components/Icon';
import styles from './Main.module.scss';
import {motion} from "framer-motion"
import { Julius_Sans_One } from "next/font/google";

const jls = Julius_Sans_One({ subsets: ["latin"], weight: ["400"] });

export const Main = () =>{

    return(
        <>
            <main id='main' className={styles.main}>
                <motion.svg
                initial={{opacity:0}}
                animate={{ scale: [0.0,0, 1.1, 1], opacity:[0,0, 1, 1] }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className={styles.backgroundSvg1} viewBox="0 0 649 508" >
                    <path d="M604.258 433.834C600.219 439.817 595.964 445.575 591.493 451.106C587.022 456.75 582.334 462.056 577.43 467.023C572.526 471.99 567.477 476.562 562.285 480.738C556.948 485.028 551.467 488.866 545.842 492.253C540.217 495.526 534.375 498.348 528.317 500.719C522.403 503.089 516.201 504.896 509.711 506.137C503.364 507.379 496.874 508 490.239 508C483.46 508 476.608 507.492 469.685 506.476C462.617 505.573 455.55 504.275 448.482 502.582C441.415 500.888 434.347 499.026 427.279 496.994C420.068 495.075 413 493.099 406.077 491.067C399.009 489.035 392.086 487.173 385.307 485.479C378.383 483.786 371.676 482.432 365.186 481.416C358.695 480.4 352.421 479.835 346.363 479.722C340.305 479.722 334.463 480.117 328.838 480.908C323.213 481.698 317.732 482.827 312.395 484.294C307.202 485.649 302.082 487.229 297.034 489.035C291.985 490.729 287.081 492.478 282.322 494.284C277.562 496.091 272.874 497.784 268.259 499.364C263.787 500.945 259.244 502.299 254.628 503.428C250.157 504.557 245.685 505.291 241.214 505.629C236.743 505.968 232.344 505.855 228.016 505.291C223.545 504.726 219.218 503.823 215.035 502.582C210.708 501.34 206.525 499.703 202.487 497.671C198.448 495.639 194.554 493.325 190.803 490.729C187.053 488.132 183.519 485.197 180.202 481.924C176.74 478.763 173.567 475.32 170.682 471.595C167.798 467.982 165.129 464.144 162.677 460.08C160.37 455.904 158.278 451.614 156.403 447.211C154.384 442.809 152.581 438.237 150.994 433.496C149.263 428.868 147.532 424.126 145.802 419.272C144.215 414.418 142.412 409.508 140.393 404.541C138.518 399.687 136.354 394.776 133.902 389.809C131.45 384.955 128.637 380.101 125.464 375.247C122.291 370.506 118.613 365.821 114.43 361.193C110.247 356.565 105.56 352.106 100.367 347.816C95.1745 343.413 89.6936 339.124 83.9241 334.947C78.1546 330.657 72.2409 326.481 66.183 322.417C60.125 318.24 54.2113 314.12 48.4419 310.056C42.5282 305.879 36.9751 301.702 31.7825 297.526C26.59 293.349 21.8302 289.059 17.5031 284.657C13.3203 280.254 9.85857 275.739 7.11808 271.111C4.23335 266.595 2.21403 261.91 1.06014 257.056C0.0504827 252.089 -0.23799 247.122 0.194719 242.156C0.627429 237.189 1.78132 232.222 3.6564 227.255C5.38724 222.288 7.76714 217.377 10.7961 212.523C13.8251 207.782 17.2868 203.154 21.1812 198.638C25.2198 194.236 29.619 190.003 34.3788 185.939C39.1386 181.988 44.1869 178.319 49.5237 174.932C54.8604 171.546 60.4135 168.498 66.183 165.789C71.9524 163.192 77.8662 160.822 83.9241 158.677C89.982 156.532 96.04 154.557 102.098 152.751C108.156 150.831 114.214 148.969 120.272 147.163C126.33 145.357 132.243 143.437 138.013 141.406C143.782 139.374 149.408 137.116 154.889 134.632C160.225 132.149 165.274 129.327 170.033 126.166C174.937 123.005 179.409 119.393 183.447 115.329C187.63 111.265 191.525 106.806 195.131 101.952C198.592 97.0981 201.91 92.0748 205.083 86.882C208.256 81.5764 211.285 76.2144 214.17 70.7959C217.199 65.3774 220.156 60.0154 223.04 54.7098C225.925 49.4042 228.882 44.2679 231.911 39.301C234.94 34.4469 238.185 29.9315 241.647 25.7547C244.964 21.578 248.57 17.8528 252.465 14.5791C256.359 11.4183 260.47 8.76553 264.797 6.62071C269.124 4.4759 273.667 2.83906 278.427 1.71021C283.043 0.694243 287.73 0.129818 292.49 0.0169328C297.25 -0.0959524 302.01 0.355588 306.77 1.37155C311.529 2.27464 316.145 3.6857 320.616 5.60475C325.232 7.52379 329.631 9.95082 333.814 12.8858C337.997 15.8209 341.891 19.2074 345.497 23.0455C349.247 26.8836 352.709 31.1168 355.882 35.7451C359.056 40.3734 362.157 45.2839 365.186 50.4766C368.07 55.5564 370.955 60.7491 373.84 66.0547C376.869 71.4732 379.97 76.7788 383.143 81.9715C386.172 87.1643 389.489 92.2441 393.095 97.211C396.701 102.065 400.596 106.58 404.779 110.757C409.106 114.934 413.793 118.659 418.842 121.933C423.89 125.207 429.443 128.029 435.501 130.399C441.415 132.657 447.689 134.576 454.324 136.156C460.959 137.737 467.882 139.148 475.094 140.39C482.161 141.631 489.373 142.817 496.729 143.945C503.941 145.074 511.225 146.316 518.581 147.671C525.937 149.025 533.149 150.606 540.217 152.412C547.284 154.331 554.063 156.589 560.554 159.185C567.189 161.894 573.463 165.055 579.377 168.667C585.435 172.28 591.06 176.287 596.253 180.69C601.589 185.205 606.494 190.059 610.965 195.252C615.58 200.557 619.763 206.089 623.513 211.846C627.264 217.716 630.653 223.812 633.682 230.133C636.567 236.455 639.091 242.946 641.255 249.606C643.418 256.266 645.149 263.039 646.447 269.925C647.601 276.924 648.394 283.923 648.827 290.922C649.115 297.921 649.043 304.976 648.611 312.088C648.178 319.2 647.312 326.311 646.014 333.423C644.86 340.422 643.274 347.421 641.255 354.42C639.379 361.532 637.144 368.474 634.547 375.247C631.951 382.133 629.067 388.906 625.893 395.566C622.72 402.227 619.331 408.774 615.725 415.208C612.119 421.53 608.296 427.739 604.258 433.834Z"/>
                </motion.svg>
                <motion.svg
                initial={{opacity:0}}
                animate={{ scale: [0.0,0, 1.1, 1], opacity:[0,0, 1, 1] }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className={styles.backgroundSvg2} viewBox="0 0 432 420">
                <path d="M212.97 1.85765C294.516 -11.9828 366.484 54.1153 407.831 113.743C442.515 163.761 438.518 227.721 404.483 278.042C378.206 316.892 309.716 305.501 263.055 327.793C205.724 355.183 174.566 430.124 109.742 418.855C41.5323 406.997 2.72518 339.551 0.056461 282.073C-2.24067 232.598 66.1436 208.274 98.0166 166.326C140.881 109.913 133.934 15.2722 212.97 1.85765Z"/>
                </motion.svg>

                <motion.svg
                initial={{opacity:0}}
                animate={{ scale: [0.0, 0, 1.1, 1], opacity:[0, 0, 1, 1] }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className={styles.backgroundSvg3} viewBox="0 0 340 438">
                    <path d="M90.7909 341.99C87.4651 340.212 84.0253 338.487 80.4716 336.815C76.9178 335.143 73.2502 333.525 69.4686 331.959C65.7174 330.31 61.9244 328.646 58.0897 326.966C54.255 325.287 50.4925 323.539 46.8021 321.723C43.1117 319.906 39.4935 318.022 35.9474 316.069C32.5153 314.063 29.2123 311.962 26.0385 309.767C22.895 307.487 20.0364 305.075 17.4627 302.53C14.8054 299.955 12.4633 297.163 10.4364 294.155C8.40959 291.147 6.72454 287.98 5.3813 284.653C3.95453 281.296 2.86956 277.779 2.12638 274.103C1.3528 270.511 0.864065 266.786 0.660152 262.928C0.456238 259.07 0.506763 255.162 0.811709 251.206C1.14706 247.165 1.7216 243.118 2.53541 239.063C3.31881 235.091 4.34145 231.112 5.60331 227.125C6.89557 223.055 8.38146 219.102 10.061 215.267C11.6874 211.319 13.5339 207.545 15.6007 203.946C17.6143 200.233 19.8216 196.637 22.2224 193.16C24.6233 189.682 27.1495 186.25 29.801 182.864C32.4221 179.561 35.1988 176.22 38.1313 172.842C41.0333 169.546 43.9506 166.21 46.8831 162.831C49.9295 159.399 53.0328 155.941 56.1932 152.456C59.3004 148.857 62.438 145.174 65.606 141.409C68.774 137.643 71.961 133.694 75.1671 129.564C78.2897 125.403 81.4047 121.003 84.5122 116.364C87.5894 111.808 90.6172 106.998 93.5957 101.933C96.5742 96.8685 99.4731 91.6329 102.292 86.2265C105.195 80.8505 108.056 75.4592 110.875 70.0528C113.724 64.5628 116.57 59.2134 119.412 54.0044C122.201 48.6815 125.039 43.613 127.926 38.7989C130.73 33.9545 133.61 29.4214 136.565 25.1998C139.521 20.9781 142.491 17.2349 145.477 13.9702C148.493 10.6219 151.634 7.83944 154.9 5.62281C158.053 3.45932 161.341 1.96038 164.767 1.126C168.109 0.26121 171.602 0.0192155 175.247 0.400014C178.862 0.864344 182.549 1.78057 186.308 3.14868C190.15 4.5472 194.137 6.32928 198.268 8.49492C202.315 10.6302 206.495 13.0502 210.808 15.7551C215.067 18.3461 219.521 21.0549 224.168 23.8814C228.701 26.761 233.39 29.6027 238.234 32.4065C243.079 35.2103 248.041 37.8205 253.121 40.237C258.254 42.7675 263.493 45.0056 268.839 46.9514C274.299 48.844 279.824 50.4291 285.413 51.7066C291.002 52.9842 296.625 54.0376 302.283 54.8671C307.941 55.6966 313.504 56.3969 318.971 56.9681C324.439 57.5393 329.767 58.1067 334.953 58.6702C340.057 59.2033 344.89 59.8275 349.455 60.5427C354.072 61.3719 358.29 62.387 362.11 63.588C365.96 64.7055 369.309 66.1609 372.156 67.954C375.087 69.7776 377.387 72.0338 379.057 74.7227C380.841 77.3585 382.006 80.5258 382.552 84.2245C383.014 87.8927 382.986 91.9975 382.469 96.5389C381.951 101.08 381.057 106.005 379.787 111.313C378.434 116.591 376.875 122.172 375.112 128.058C373.264 133.912 371.356 139.934 369.388 146.123C367.388 152.396 365.458 158.74 363.595 165.157C361.649 171.543 359.927 177.964 358.429 184.419C356.847 190.843 355.619 197.207 354.744 203.51C353.838 209.897 353.388 216.071 353.394 222.033C353.4 227.995 353.831 233.827 354.688 239.531C355.574 245.151 356.746 250.638 358.203 255.993C359.69 261.264 361.363 266.414 363.222 271.442C365.081 276.47 367.028 281.388 369.062 286.196C371.012 290.973 372.966 295.61 374.924 300.107C376.852 304.687 378.628 309.164 380.252 313.539C381.792 317.884 383.082 322.137 384.121 326.299C385.16 330.461 385.793 334.57 386.02 338.625C386.246 342.681 386.025 346.668 385.355 350.586C384.572 354.558 383.455 358.408 382.003 362.137C380.437 365.918 378.564 369.635 376.384 373.288C374.15 376.826 371.608 380.3 368.759 383.709C365.941 387.034 362.913 390.284 359.677 393.457C356.358 396.6 352.859 399.584 349.183 402.408C345.506 405.232 341.693 407.912 337.743 410.447C333.877 413.013 329.904 415.351 325.825 417.461C321.716 419.655 317.626 421.666 313.555 423.495C309.4 425.294 305.264 426.91 301.148 428.344C297.031 429.778 292.918 431.072 288.809 432.225C284.731 433.295 280.614 434.209 276.46 434.967C272.389 435.756 268.379 436.377 264.43 436.832C260.397 437.256 256.41 437.555 252.468 437.728C248.557 437.818 244.691 437.783 240.871 437.622C237.021 437.545 233.247 437.259 229.548 436.764C225.82 436.353 222.193 435.79 218.67 435.075C215.116 434.444 211.664 433.661 208.315 432.726C204.883 431.76 201.58 430.7 198.405 429.544C195.148 428.359 192.019 427.078 189.02 425.703C185.906 424.38 182.937 422.921 180.113 421.325C177.258 419.813 174.49 418.191 171.81 416.459C169.129 414.726 166.521 412.926 163.985 411.057C161.533 409.218 159.152 407.311 156.844 405.336C154.536 403.361 152.3 401.317 150.136 399.205C148.056 397.124 146.048 394.974 144.112 392.756C142.146 390.621 140.251 388.418 138.429 386.147C136.577 383.959 134.74 381.73 132.918 379.458C131.096 377.187 129.274 374.916 127.452 372.645C125.516 370.426 123.538 368.193 121.519 365.944C119.469 363.779 117.362 361.641 115.198 359.529C112.951 357.387 110.59 355.298 108.114 353.261C105.556 351.195 102.868 349.224 100.051 347.347C97.1503 345.44 94.0636 343.654 90.7909 341.99Z"/>
                </motion.svg>
                

                    <div className={styles.container}>
                    <svg className={styles.svg} viewBox="0 0 299 739" >
                        <g>
                        <motion.path initial={{strokeDashoffset: 2000}}
                            animate={{ strokeDashoffset: 0}}
                            transition={{ duration: 5, delay: 0 }}
                            className={styles.draw} d="M91 89.0076C91 87.2358 89.5637 85.7996 87.792 85.7996H86.208C84.4363 85.7996 83 87.2358 83 89.0076V89.0076C83 90.7793 84.4363 92.2156 86.208 92.2156H87.792C89.5637 92.2156 91 90.7793 91 89.0076V89.0076Z"/>
                        <motion.path initial={{strokeDashoffset: 2000}}
                            animate={{ strokeDashoffset: 0}}
                            transition={{ duration: 5, delay: 0.2 }}
                            className={styles.draw} d="M164 705.748C164 705.748 159.216 729.022 176.5 732.216C193.784 735.409 200.468 728.235 204 721.789C208.725 713.168 207.5 703.742 206 697.728C204.5 691.715 202.276 684.383 197 676.876C193.031 671.228 189.761 668.565 184.5 663.643C168.227 648.416 135.5 630.761 135.5 630.761M135.5 630.761C135.5 630.761 83.3999 604.139 53.5 583.442C41.6665 575.251 24.6871 561.903 22.2863 560.009C22.0883 559.853 21.9084 559.699 21.7239 559.527C18.2863 556.321 11.4464 549.317 9.5 544.946C7.5 540.455 6 532.515 6 532.515M135.5 630.761C135.5 630.761 137.273 625.67 138 622.34C140.904 609.045 137.269 594.135 137.014 593.121C137.004 593.082 136.996 593.052 136.985 593.013C136.653 591.806 130.667 570.388 121.5 558.58C114.548 549.626 110.008 544.473 99.5 538.129C91.8927 533.536 87.1249 530.863 78 528.906C68.7569 526.924 62.5711 526.466 53.5 528.906C44.7618 531.257 40.6755 534.647 34.5 540.134C25.6632 547.986 23.7059 554.444 20 564.595C16.2941 574.746 14 607.102 20 633.167C22.0397 642.028 23.6172 647.83 24.8109 651.629C26.2092 656.079 29.357 661.85 31.5125 665.987C34.2693 671.277 38.3275 678.386 42.5 683.292C48.1929 689.986 51.8703 693.621 59.5 698.933C65.7577 703.289 71.0367 706.749 77 708.557C85.2027 711.044 92.3536 713.504 102 711.765C107.455 710.781 111.618 709.568 116 706.151C123.269 700.482 123.178 692.929 122.5 684.096C122.017 677.806 117.185 668.95 116.182 667.17C116.06 666.953 115.933 666.753 115.789 666.55C114.562 664.815 108.134 655.955 100.5 649.608C95.2061 645.206 89.9616 640.99 84 637.177C79.7556 634.462 77.5699 632.71 73 630.36C69.9826 628.808 65 626.751 65 626.751M113 505.247C117.704 508.211 124.678 512.606 126.533 513.775C126.847 513.973 127.164 514.148 127.5 514.308C129.017 515.032 133.669 517.222 137 518.48C140.806 519.916 143.082 520.46 147 521.688C151.087 522.968 153.325 523.812 157.5 524.896C160.97 525.797 162.883 526.524 166.5 526.901C169.792 527.244 171.687 527.068 175 526.901C176.959 526.802 178.094 526.874 180 526.5C181.186 526.267 182.777 525.731 183.546 525.46C183.85 525.353 184.145 525.227 184.429 525.076C185.186 524.673 186.75 523.778 187.5 522.891C188.54 521.661 188.605 520.733 189 519.282C189.46 517.592 189.519 516.6 189.5 514.871C189.482 513.297 189.385 512.404 189 510.861C188.43 508.578 187.601 507.401 186.5 505.247C185.605 503.496 185.105 502.508 184 500.836C182.478 498.533 181.379 497.248 179.5 495.222C178.261 493.886 177.406 493.238 176 492.014C173.755 490.059 172.439 489 170 487.202C166.834 484.867 164.953 483.643 161.5 481.588C159.586 480.448 158.21 479.795 156 478.782C152.435 477.149 150.372 476.49 146.5 475.172C142.628 473.853 140.509 472.984 136.5 471.964C132.482 470.941 130.193 470.306 126 469.958C122.698 469.685 120.801 469.68 117.5 469.958C113.919 470.261 111.783 470.378 108.5 471.562C106.178 472.4 104.929 473.037 103 474.37C101.218 475.6 100.177 476.346 99 477.979C97.5773 479.953 97.2747 481.323 97 483.593C96.6771 486.261 96.943 488.569 97.5 491.212C97.8318 492.786 98.0253 493.27 98.5 494.821C99.1331 496.889 99.9225 497.686 101 499.633C102.209 501.818 103.206 502.937 105 504.846C106.747 506.705 107.909 507.642 110 509.257C111.495 510.411 112.353 511.051 114 512.064C115.676 513.094 116.388 513.587 118 514.472C119.52 515.306 120.36 515.803 122 516.477C123.323 517.02 124.107 517.261 125.5 517.678C127.41 518.249 128.532 518.456 130.5 518.881C133.015 519.424 134.429 519.745 137 520.084C138.553 520.289 139.431 520.385 141 520.485C143.725 520.658 145.271 520.612 148 520.485C149.959 520.394 151.074 520.387 153 520.084C155 519.769 156.154 519.574 158 518.881C160.405 517.978 161.493 517.068 163.5 515.673C165.169 514.512 166.06 513.808 167.5 512.465C168.773 511.277 169.487 510.596 170.5 509.257C171.724 507.639 172.182 506.621 173 504.846C173.707 503.312 174.008 502.422 174.5 500.836C174.981 499.286 175.213 498.406 175.5 496.826C175.923 494.496 175.909 493.164 176 490.811C176.078 488.776 176.245 487.624 176 485.598C175.789 483.855 175.457 482.899 175 481.187C174.495 479.292 174.174 478.235 173.5 476.375C172.81 474.472 172.487 473.378 171.5 471.562C170.523 469.764 169.742 468.842 168.5 467.151C167.555 465.865 166.12 464.101 165.418 463.246C165.14 462.908 164.84 462.592 164.517 462.297C163.66 461.514 161.839 459.861 160.5 458.73C159.018 457.479 156.728 455.689 156.141 455.231C156.046 455.157 155.954 455.083 155.862 455.006C155.373 454.6 153.693 453.212 152.5 452.314C150.986 451.176 150.1 450.568 148.5 449.507C146.784 448.369 145.757 447.797 144 446.7C142.243 445.604 141.242 445.005 139.5 443.893C137.328 442.508 136.158 441.684 134 440.284C132.056 439.023 130.521 438.257 128.5 437.076C125.874 435.541 124.72 434.894 122 433.467C119.054 431.922 117.526 430.9 114.5 429.457C112.772 428.633 111.764 428.225 110 427.452C106.32 425.841 104.187 425.042 100.5 423.442C96.9639 421.907 94.99 421.033 91.5 419.432C89.1454 418.352 87.8662 417.689 85.5 416.625C82.6045 415.323 81.0119 414.536 78 413.417C75.1377 412.354 78 413.417 70.5 411.011C63 408.605 68.5 415.021 70.5 416.224C72.5 417.427 76.1268 419.162 80 420.635C83.4073 421.931 85.4283 422.472 89 423.442C92.5717 424.413 94.087 424.991 97.5 425.447C99.8193 425.757 101.173 426.118 103.5 425.848C105.333 425.635 106.615 425.632 108 424.645C109.305 423.715 109.715 422.773 110.5 421.437C111.29 420.093 111.605 419.28 112 417.828C112.46 416.138 112.628 415.144 112.5 413.417C112.403 412.102 111.786 410.228 111.572 409.612C111.525 409.474 111.472 409.34 111.416 409.205L109.417 404.396C109.14 403.729 108.791 403.094 108.38 402.5C107.734 401.566 106.718 400.086 106 398.981C104.991 397.428 104.52 396.519 103.5 394.971C102.781 393.88 102.041 393.17 101.471 392.266C101.109 391.692 100.684 391.074 100.729 390.397C100.825 388.983 103.05 387.572 109.5 390.159C117.5 393.367 122.167 395.506 123.5 396.174C124.833 396.842 129.073 398.752 132.5 400.585C135.295 402.08 136.719 403.084 139.5 404.595C142.191 406.057 143.697 406.886 146.5 408.204C148.987 409.374 150.412 409.992 153 411.011C155.679 412.067 159.797 413.425 160.783 413.747C160.928 413.795 161.051 413.832 161.198 413.871C164.104 414.627 197.593 422.858 174.875 394.237C174.638 393.939 174.366 393.635 174.093 393.369C173.092 392.391 170.452 389.833 168.5 388.154C166.429 386.372 165.148 385.466 163 383.743C161.047 382.177 159.997 381.262 158 379.733C155.9 378.125 154.756 377.188 152.5 375.723C150.436 374.382 147 372.515 147 372.515M93 346.049C93 346.049 32 307.552 40.5 317.577C48.4464 326.95 71.6873 336.322 74.6811 337.503C74.8969 337.588 75.1051 337.677 75.3152 337.775L93 346.049ZM93 346.049V369.29M93 346.049V321.571M93 346.049C93 346.049 107.126 353.873 116.5 358.48C127.604 363.937 145.133 371.313 147.686 372.383C147.903 372.474 148.078 372.541 148.302 372.614C152.67 374.027 202.563 389.514 175.668 350.303C175.562 350.149 175.455 349.984 175.355 349.827C174.336 348.218 167.963 338.464 156.5 327.603C153.219 324.494 142.877 316.595 137.066 312.209C134.512 310.281 132.944 307.215 131.639 304.294C127.722 295.524 114.713 278.161 84.5 254.62C70.258 244.992 61.1648 238.4 43.5 228.555C7.27546 208.365 -5.95607 224.182 22 251.412C37.526 266.535 46.3884 269.647 67.5 281.487C87.7615 292.851 123.476 306.411 126.319 307.484C126.454 307.535 126.566 307.581 126.699 307.637L151 317.978L175.5 327.603L192 333.627M192 333.627L182.5 319.181C153.993 261.074 217.268 282.466 218 282.69C242.642 290.388 254.278 296.881 272.5 311.963C332.361 377.43 241.458 350.641 239.531 350.068C239.471 350.05 239.47 350.049 239.411 350.03L214.5 342.039L192 333.627ZM109 235.372L142.688 252.209C143.228 252.479 143.784 252.698 144.365 252.863C167.927 259.511 205.086 262.469 171.5 222.54C165.239 216.299 139.646 202.216 121.5 199.282C103.354 196.348 76.2215 210.891 105 239.783C113.182 247.998 150.796 262.372 167.051 236.117C167.351 235.633 167.6 235.111 167.793 234.576C172.954 220.25 175.771 194.956 137 176.424C134.538 175.248 130.392 168.98 128.984 166.77C128.657 166.257 128.407 165.728 128.118 165.192C124.281 158.054 98.6785 127.225 48.5 97.4269C-3.9 66.3091 -13.5 105.848 55 139.131C93.3118 159.504 114.956 168.492 153.925 178.01C153.974 178.022 153.977 178.023 154.026 178.035C155.598 178.438 227.992 196.673 144.515 118.822C143.871 118.222 143.105 117.67 142.325 117.26L124.5 107.887M113 101.84L124.5 107.887M111.5 66.9344C112 67.2853 112.5 67.6322 113 67.9751M135.5 6C183.597 28.8297 178.06 59.3866 169.959 72.6406C169.657 73.1346 169.294 73.5939 168.891 74.0103C147.79 95.8566 121.385 80.9033 109.5 72.1655C77 42.4913 109.5 26.8521 135.5 35.2732C159.5 43.0465 175.833 55.1897 181 62.1404C207.521 97.3785 160.498 100.555 113 67.9751M124.5 107.887L154 122.291C170.722 128 196.752 132.576 168.081 105.592C167.71 105.243 167.288 104.904 166.867 104.617L113 67.9751M87.792 92.2156H86.208C84.4363 92.2156 83 90.7793 83 89.0076V89.0076C83 87.2358 84.4363 85.7996 86.208 85.7996H87.792C89.5637 85.7996 91 87.2358 91 89.0076V89.0076C91 90.7793 89.5637 92.2156 87.792 92.2156Z"/>
                        </g>

                    </svg>
                    <motion.div
                    initial={{opacity:0}}
                    animate={{ scale: [0.0, 1.1, 1], opacity:[0, 1, 1] }}
                    transition={{ duration: 0.3, delay: 1.2 }}
                    className={styles.nameContainer}>
                        <h1 style={jls.style} className={styles.h1}>Juan Bautista Quiroga</h1>
                    </motion.div>
                </div>
                <motion.div className={styles.links}>
                    <Icon icon="instagram" delay={0.25} link="https://instagram.com/juanbaquiroga"></Icon>
                    <Icon icon="linkedin" delay={0.30} link="https://linkedin.com/in/juanbaquiroga"></Icon>
                    <Icon icon="github" delay={0.35} link="https://github.com/juanbaquiroga"></Icon>
                </motion.div>
            </main>
        </>
    )
}
