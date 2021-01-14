import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**This is where the site for the References page:
 * Since our project is research based its only fair that we 
 * make sure to reference the papers we used to study up
 * on all the topics that are in relation to our topic: DementiaTrack
 **/

export class References extends Component{
    render(){
        return(
            <div>
            <h2>Reference List:</h2>
            <p>
            <ol>
                <li>Aisuwarya, Ratna, Melisa, and Ferdian, Rian. "Monitoring and Notification System of the Position of a Person with Dementia Based on Internet of Things (IoT) and Google Maps." (2019): 396-400. Web.
                </li>
                    Alzheimer's Association. (2020, October 27). Suspicions and Delusions. Retrieved from Alzheimer's Association: https://www.alz.org/help-support/caregiving/stages-behaviors/suspicions-delusions 
                <li>
                    Azziza Bankole, Martha Anderson, Aubrey Knight, Kyunghui Oh, Tonya Smith-Jackson, Mark A. Hanson, Adam T. Barth, and John Lach. 2011. Continuous, non-invasive assessment of agitation in dementia using inertial body sensors. In Proceedings of the 2nd Conference on Wireless Health (WH '11). Association for Computing Machinery, New York, NY, USA, Article 1, 1–9. DOI:https://doi.org/10.1145/2077546.2077548 
                </li>
                    Chen, Wu-Lin, Chen, Liang-Bi, Chang, Wan-Jung, and Tang, Jing-Jou. "An IoT-based Elderly Behavioral Difference Warning System." (2018): 308-09. Web. 
                <li>
                    Costanzo, M., Arcidiacono, C., Rodolico, A., Panebianco, M., Aguglia, E., & Signorelli, M. (2019, November 15). Diagnostic and interventional implications of telemedicine in Alzheimer's disease and mild cognitive impairment: A literature review. Retrieved September 28, 2020, from https://onlinelibrary.wiley.com/doi/full/10.1002/gps.5219 
                </li>
                <li>
                    Basu S., Wagstyl K., Zandifar A., Collins L., Romero A., Precup D. (2019) Early Prediction of Alzheimer’s Disease Progression Using Variational Autoencoders. In: Shen D. et al. (eds) Medical Image Computing and Computer Assisted Intervention – MICCAI 2019. MICCAI 2019. Lecture Notes in Computer Science, vol 11767. Springer, Cham. https://doi.org/10.1007/978-3-030-32251-9_23 
                </li>
                <li>
                    Blondell, S.J., Hammersley-Mather, R. & Veerman, J.L. Does physical activity prevent cognitive decline and dementia?: A systematic review and meta-analysis of longitudinal studies. BMC Public Health 14, 510 (2014). https://doi.org/10.1186/1471-2458-14-510 
                </li>
                <li>
                    Choi H, Kang H, Lee DS; Alzheimer's Disease Neuroimaging Initiative. Predicting Aging of Brain Metabolic Topography Using Variational Autoencoder. Front Aging Neurosci. 2018;10:212. Published 2018 Jul 12. doi:10.3389/fnagi.2018.00212 
                </li>
                <li>Cook, D. J. (2006, January 1). Health Monitoring and Assistance to Support Aging in. Journal of Universal Computer Science, 12(1), 15-29. Retrieved October 27, 2020, from Journal of Universal Computer Science: http://www.jucs.org/jucs_12_1/health_monitoring_and_assistance/jucs_12_01_0015_0029_cook.pdf 
                    
                </li>
                <li>Daly, B., Thompsell, A., Sharpling, J., Rooney, Y., Hillman, L., Wanyonyi, K., White, S., & Gallagher, J. (2018). Evidence summary: the relationship between oral health and dementia. BDJ, 223, 846-853. 

                </li>
                <li>Dillard, R. (2020, February 28). What is the Future of Remote Patient Monitoring (RPM)? Retrieved September 28, 2020, from https://www.docwirenews.com/blog/what-is-the-future-of-remote-patient-monitoring-rpm/  

                </li>
                <li>Enshaeifar S, Zoha A, Markides A, Skillman S, Acton ST, Elsaleh T, et al. (2018) Health management and pattern analysis of daily living activities of people with dementia using in-home sensors and machine learning techniques. PLoS ONE 13(5): e0195605. https://doi.org/10.1371/journal.pone.0195605 

                </li>
                <li>Enshaeifar, S., Zoha, A., Skillman, S., Markides, A., Acton, S. T., Elsaleh, T., Kenny, M., Rostill, H., Nilforooshan, R., & Barnaghi, P. (2019). Machine learning methods for detecting urinary tract infection and analysing daily living activities in people with dementia. PLOS ONE, 14(1), e0209909. https://doi.org/10.1371/journal.pone.0209909 

                </li>
                <li>F. Alvarez et al., "Behavior Analysis through Multimodal Sensing for Care of Parkinson’s and Alzheimer’s Patients," in IEEE MultiMedia, vol. 25, no. 1, pp. 14-25, Jan.-Mar. 2018, doi: 10.1109/MMUL.2018.011921232. 

                </li>
                <li>F. Zafari, A. Gkelias and K. K. Leung, "A Survey of Indoor Localization Systems and Technologies," in IEEE Communications Surveys & Tutorials, vol. 21, no. 3, pp. 2568-2599, thirdquarter 2019, doi: 10.1109/COMST.2019.2911558. 

                </li>
                <li>Gopalratnam, Karthik & Cook, Diane. (2004). Active LeZi: An incremental parsing algorithm for sequential prediction. International Journal on Artificial Intelligence Tools - IJAIT. 13. 10.1142/S0218213004001892. 

                </li>
                <li>Hamdy, R. C., Kinser, A., Lewis, J. V., Copeland, R., Depelteau, A., Kendall-Wilson, T., & Whalen, K. (2017). Hallucinations Are Real to Patients With Dementia. Gerontology & geriatric medicine, 3, 2333721417721108. https://doi.org/10.1177/2333721417721108  

                </li>
                <li>Haux R, Koch S, Lovell NH, Marschollek M, Nakashima N, Wolf KH. Health-Enabling and Ambient Assistive Technologies: Past, Present, Future. Yearb Med Inform. 2016;Suppl 1(Suppl 1):S76-S91. Published 2016 Jun 30. doi:10.15265/IYS-2016-s008 

                </li>
                <li>Heerema, E. (2020, April 18). How to Reduce and Respond to Pacing Behavior in Dementia Patients. Retrieved from VeryWellHealth: https://www.verywellhealth.com/reducing-and-responding-to-pacing-behavior-in-dementia-98588 

                </li>
                <li>Huang, K., He, K., & Du, X. (2019). A Hybrid Method to Improve the BLE-Based Indoor Positioning in a Dense Bluetooth Environment. Sensors (Basel, Switzerland), 19(2), 424. https://doi.org/10.3390/s19020424  

                </li>
                <li>Huh, J. H., & Seo, K. (2017). An Indoor Location-Based Control System Using Bluetooth Beacons for IoT Systems. Sensors (Basel, Switzerland), 17(12), 2917. https://doi.org/10.3390/s17122917  

                </li>
                <li>Husebo, B. S., Heintz, H. L., Berge, L. I., Owoyemi, P., Rahman, A. T., & Vahia, I. V. (2020). Sensing Technology to Monitor Behavioral and Psychological Symptoms and to Assess Treatment Response in People With Dementia. A Systematic Review. Frontiers in pharmacology, 10, 1699. https://doi.org/10.3389/fphar.2019.01699 

                </li>
                <li>Ishii, H., Kimino, K., Aljehani, M., Ohe, N. , & Inoue, M. (2016). An Early Detection System for Dementia Using the M2 M/IoT Platform. Procedia Computer Science, 96, 1332-1340. doi:https://doi.org/10.1016/j.procs.2016.08.178 

                </li>
                <li>Kueper, J. K., Speechley, M., & Montero-Odasso, M. (2018). The Alzheimer's Disease Assessment Scale-Cognitive Subscale (ADAS-Cog): Modifications and Responsiveness in Pre-Dementia Populations. A Narrative Review. Journal of Alzheimer's disease: JAD, 63(2), 423–444. https://doi.org/10.3233/JAD-170991 

                </li>
                <li>K. Takahashi, K. Kitamura, Y. Nishida and H. Mizoguchi, "Battery-less shoe-type wearable location sensor system for monitoring people with dementia," 2019 13th International Conference on Sensing Technology (ICST), Sydney, Australia, 2019, pp. 1-4, doi: 10.1109/ICST46873.2019.9047673. 

                </li>
                <li>K. Kawanishi, H. Kawanaka, H. Takase and S. Tsuruoka, "A study on dementia detection method with stroke data using anomaly detection," 2017 6th International Conference on Informatics, Electronics and Vision & 2017 7th International Symposium in Computational Medical and Health Technology (ICIEV-ISCMHT), Himeji, 2017, pp. 1-4, doi: 10.1109/ICIEV.2017.8338566. 

                </li>
                <li>Laxman, S., Sastry, P. S., & Unnikrishnan, K. P. (2007, August). A Fast Algorithm For Finding Frequent Episodes In Event. Proceedings of the 13th ACM SIGKDD International Conference on Knowledge Discovery and Data Mining (KDD 2007), 410-419. Retrieved October 27, 2020, from Microsoft: https://www.microsoft.com/en-us/research/publication/a-fast-algorithm-for-finding-frequent-episodes-in-event-streams/ 

                </li>
                <li>Mielke, C. , Antons, R., & Haux, R. (n.d.). Detection of Psychomotor Agitation Pattern from Motion Sensor Data in a Living Environment of a Patient with Dementia. Studies in Health Technology and Informatics, 270, 746-750. doi:10.3233/SHTI200260 

                </li>
                <li>Motarjemi, R. (2017, July 30). Symptoms of Dementia. San Diego, California, United States of America. Retrieved October 27, 2020, from https://www.youtube.com/watch?v=WAQCXs3TNh8 

                </li>
                <li>New Findings on Dementia from Sikkim University Summarized (A Systematic Review and Implementation of IoT-Based Pervasive Sensor-Enabled Tracking System for Dementia Patients). (2019). Mental Health Weekly Digest, 412. 

                </li>
                <li>NHS UK. (2020, January 16). Symptoms Frontotemporal Dementia. Retrieved September 28, 2020, from https://www.nhs.uk/conditions/frontotemporal-dementia/ 

                </li>
                <li>NHS UK. (2020, June 12). Symptoms of dementia. (NHS) Retrieved October 27, 2020, from https://www.nhs.uk/conditions/dementia/symptoms/ 

                </li>
                <li>Medina, M., & Castillo-Pino, E. (2019). An introduction to the epidemiology and burden of urinary tract infections. Therapeutic Advances in Urology, 11, 175628721983217. https://doi.org/10.1177/1756287219832172 

                </li>
                <li>M. Gochoo, T. Tan, V. Velusamy, S. Liu, D. Bayanduuren and S. Huang, "Device-Free Non-Privacy Invasive Classification of Elderly Travel Patterns in a Smart House Using PIR Sensors and DCNN," in IEEE Sensors Journal, vol. 18, no. 1, pp. 390-400, 1 Jan.1, 2018, doi: 10.1109/JSEN.2017.2771287. 

                </li>
                <li>Olivia Walch, Yitong Huang, Daniel Forger, Cathy Goldstein, Sleep stage prediction with raw acceleration and photoplethysmography heart rate data derived from a consumer wearable device, Sleep, Volume 42, Issue 12, December 2019, zsz180, https://doi.org/10.1093/sleep/zsz180 

                </li>
                <li>Paudel, Ramesh. (2018). Anomaly Detection of Elderly Patient Activities in Smart Homes using a Graph-Based Approach. 

                </li>
                <li>Phelps, R. (2020, June 8). An Inside Take on Dementia Behaviors. Retrieved from AgingCare: https://www.agingcare.com/articles/an-inside-take-on-dementia-behaviors-197990.htm#:~:text=They%20simply%20cannot%20believe%20what,and%20often%20%E2%80%9Cannoying%E2%80%9D%20behaviors. 

                </li>
                <li>Potter, P. A., Perry, A. G., Hall, A. M., & Stockert, P. A. (2017). Fundamentals of Nursing. St. Louis, Mo: Mosby Elsevier. 

                </li>
                <li>Potter, R., Ellard, D., Rees, K. and Thorogood, M. (2011), A systematic review of the effects of physical activity on physical functioning, quality of life and depression in older people with dementia. Int. J. Geriat. Psychiatry, 26: 1000-1011. doi: https://onlinelibrary.wiley.com/action/showCitFormats?doi=10.1002%2Fgps.2641 

                </li>
                <li>Ray, Partha Pratim, Dash, Dinesh, & De, Debashis. (2019). A Systematic Review and Implementation of IoT-Based Pervasive Sensor-Enabled Tracking System for Dementia Patients. Journal of Medical Systems, 43(9), 1-21. 

                </li>
                <li>Ridwan Alam, Nutta Homdee, Sean Wolfe, James Hayes, and John Lach. (2019). Besi: behavior learning and tracking with wearable and in-home sensors - a dementia case-study: poster abstract. In Proceedings of the International Conference on Internet of Things Design and Implementation (IoTDI '19). Association for Computing Machinery, New York, NY, USA, 281–282. DOI: https://doi.org/10.1145/3302505.3312595 

                </li>
                <li>S. Enshaeifar et al., "The Internet of Things for Dementia Care," in IEEE Internet Computing, vol. 22, no. 1, pp. 8-17, Jan./Feb. 2018, doi: 10.1109/MIC.2018.112102418. 

                </li>
                <li>Simone. (2020, August 09). Wifi indoor positioning using Arduino and Machine Learning in 4 steps. Retrieved September 28, 2020, from https://eloquentarduino.github.io/2019/12/wifi-indoor-positioning-on-arduino/ 

                </li>
                <li>Sposaro, F., Danielson, J., & Tyson, G. (2010). iWander: An Android application for dementia patients. Annual International Conference of the IEEE Engineering in Medicine and Biology Society. IEEE Engineering in Medicine and Biology Society. Annual International Conference, 2010, 3875–3878. https://doi.org/10.1109/IEMBS.2010.5627669  

                </li>
                <li>Stavropoulos, Thanos G, Papastergiou, Asterios, Mpaltadoros, Lampros, Nikolopoulos, Spiros, & Kompatsiaris, Ioannis. (2020). IoT Wearable Sensors and Devices in Elderly Care: A Literature Review. Sensors (Basel, Switzerland), 20(10), 2826. 

                </li>
                <li>Syrjälä, A.‐M.H., Ylöstalo, P., Ruoppi, P., Komulainen, K., Hartikainen, S., Sulkava, R. and Knuuttila, M. (2012), Dementia and oral health among subjects aged 75 years or older. Gerodontology, 29: 36-42. doi:10.1111/j.1741-2358.2010.00396.x 

                </li>
                <li>Toot, S., Devine, M., Akporobaro, A., & Orrell, M. (2013). Causes of Hospital Admission for People With Dementia: A Systematic Review and Meta-Analysis. Journal of the American Medical Directors Association, 14(7), 463–470. https://doi.org/10.1016/j.jamda.2013.01.011 

                </li>
                <li>Tosi, Jacopo, Taffoni, Fabrizio, Santacatterina, Marco, Sannino, Roberto, & Formica, Domenico. (12017). Performance Evaluation of Bluetooth Low Energy: A Systematic Review. Sensors (Basel, Switzerland), 17(12), 2898. 

                </li>
                <li>T. Qassem, G. Tadros, P. Moore and F. Xhafa, "Emerging Technologies for Monitoring Behavioural and Psychological Symptoms of Dementia," 2014 Ninth International Conference on P2P, Parallel, Grid, Cloud and Internet Computing, Guangdong, 2014, pp. 308-315, doi: 10.1109/3PGCIC.2014.82. 

                </li>
                <li>Vivien Bromundt, Anna Wirz-Justice, Marc Boutellier, Seraina Winter, Markus Haberstroh, Michael Terman, Mirjam Münch, Effects of a dawn-dusk simulation on circadian rest-activity cycles, sleep, mood and well-being in dementia patients, Experimental Gerontology,Volume 124, 2019, 110641, ISSN 0531-5565, https://doi.org/10.1016/j.exger.2019.110641 

                </li>
                <li>Vuong, N.K. & Chan, Syin & Lau, C.T.. (2014). Automated detection of wandering patterns in people with dementia. Gerontechnology. 12. 127-147. 10.4017/gt.2014.12.3.001.00. 

                </li>
                <li>Yang, D., Xu, B., Rao, K., & Sheng, W. (2018, January 24). Passive Infrared (PIR)-Based Indoor Position Tracking for Smart Homes Using Accessibility Maps and A-Star Algorithm. Retrieved September 28, 2020, from https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5855945/  

                </li>
                <li>Y. Watanabe, Y. Kobayashi, M. Tanaka, T. Asada, K. Ishii and T. Yagi, "An analysis for Alzheimer’s disease using cross-correlation and averaged frequency of EEG data," 2018 11th Biomedical Engineering International Conference (BMEiCON), Chiang Mai, 2018, pp. 1-5, doi: 10.1109/BMEiCON.2018.8609932. 

                </li>
            </ol>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            </p>

        
            </div>
        )
    }
}

export default References;
